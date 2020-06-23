const getCurrentUser = JSON.parse(localStorage.getItem('currentUser')); 

export const UserService = {
    getRequestDigest,
    getToken,
    authentication,
    logout,
    addNewMember,
    newPassword,
    hasUserName,
    currentUser:getCurrentUser
}

async function getRequestDigest(){
    var token=localStorage.getItem('token');

    return fetch("https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/contextinfo",{
        method:"POST",
		headers:{
            Accept:"application/json;odata=nometadata",
            Authorization:`Bearer ${token}`
        },
    }).then(async res=>{
        localStorage.setItem('digest',JSON.stringify(await res.json()));
    })
}

async function getToken(){
    return fetch('https://cors-anywhere.herokuapp.com/https://accounts.accesscontrol.windows.net/4e847bc8-615a-4c91-a8ca-8cff7106481e/tokens/OAuth/2',{
        method:"POST",
        headers:{
            Accept:"application/json;odata=verbose",
            "Content-Type":"application/x-www-form-urlencoded"
        },

        body : `grant_type=client_credentials&client_id=c2ceb91e-8da8-43e5-aa40-1cccdf13d2fb@4e847bc8-615a-4c91-a8ca-8cff7106481e&client_secret=E4j1aigPbbU3qiFq7XL7aQxwuRExW5zAN/NNSxWXKVk=&resource=00000003-0000-0ff1-ce00-000000000000/chandraprakashtiwariv.sharepoint.com@4e847bc8-615a-4c91-a8ca-8cff7106481e`
    }).then(a => a.json()).then(a => {localStorage.setItem("token",a.access_token); return Promise.resolve();}).catch(e => console.log(e))
    
}

function authentication(userName, password){
    getToken();
    getRequestDigest();
    var token=localStorage.getItem('token');

    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('Users')/items?";
    var query=`$filter=(UserName eq '${userName}')and(Password eq '${password}')`;

    return fetch(url+query, {
        headers: { 
            Accept:'application/json;odata=nometadata',
            'Content-Type': 'application/json' ,
            Authorization:`Bearer ${token}`
        },
    }).then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            if(data.value.length === 1){
                if(data.value[0].Role==='Admin'){
                    var rec={
                        name:data.value[0].Title,
                        address:data.value[0].Address,
                        userName:data.value[0].UserName,
                        id:data.value[0].ID,
                        role:data.value[0].Role,
                        firstTimeLogin:data.value[0].FirstTimeLogin
                    }
                }
                else if(data.value[0].Role==='Manager'){
                    var rec={
                        name:data.value[0].Title,
                        address:data.value[0].Address,
                        userName:data.value[0].UserName,
                        id:data.value[0].ID,
                        role:data.value[0].Role,
                        firstTimeLogin:data.value[0].FirstTimeLogin,
                        parkingLot:data.value[0].ParkingLotId
                    }
                }
                localStorage.setItem('currentUser', JSON.stringify(rec));
                return Promise.resolve("ok");
            }
            else{
                return Promise.reject("wrong");
            }
        }
        else if (response.status === 500) {
            return Promise.reject("servererror");
        }

        return Promise.reject();
    }).catch(error => {
        return error;
    })
}

function logout(){
    localStorage.clear();
}

function addNewMember(userData){
    getRequestDigest();
    var digest=localStorage.getItem('digest');
    var token=localStorage.getItem('token');
    var data1 = {
        Title:userData.name,
        Role: userData.type,
        Address: userData.address,
        Password: userData.password,
        UserName: userData.userName,
        ParkingLotId:userData.parkinLotId
    }

    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('Users')/items";

    return fetch(url,{
		method:"POST",
		headers:{
		Accept:"application/json;odata=verbose",
            "x-RequestDigest":digest.FormDigestValue,
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
		},
		body:JSON.stringify(data1)	
	}).then(async r=>{
        if(r.status===201){
            return Promise.resolve("Ok");
        }
        return Promise.reject("Reject");
    });
}

function newPassword(password){
    var digest=localStorage.getItem('digest');
    var token=localStorage.getItem('token');
    var url=`https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('Users')/items(${UserService.currentUser.id})`;                
    return fetch(url, {
        method:"POST",
        headers: { 
            Accept:'application/json;odata=nometadata',
            'Content-Type': 'application/json' ,
            Authorization:`Bearer ${token}`,
            "x-RequestDigest":digest.FormDigestValue,
            "If-Match":"*",
            "X-HTTP-Method":"MERGE"
        },
        body:JSON.stringify({
            Password:password,
            FirstTimeLogin:false
        })
    }).then(async response => {
        if (response.status === 204) {
            var data=JSON.parse(localStorage.getItem('currentUser'));
            data.firstTimeLogin=false;
            localStorage.setItem('currentUser',JSON.stringify(data));
            window.location.reload();
            return Promise.resolve("Ok");
        }
        return Promise.resolve();
    }).catch(error => {
        return error;
    })  
}

function hasUserName(userName){
    var token=localStorage.getItem('token');
    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('Users')/items?";
    var query=`$filter=(UserName eq '${userName}')`;

    return fetch(url+query, {
        headers: { 
            Accept:'application/json;odata=nometadata',
            'Content-Type': 'application/json' ,
            Authorization:`Bearer ${token}`
        },
    }).then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            if(data.value.length === 1){
                return Promise.resolve(false);
            } 
            else{
                return Promise.resolve(true);
            }
        }
        else if (response.status === 500) {
            return Promise.reject("servererror");
        }

        return Promise.reject();
    }).catch(error => {
        return error;
    })
}
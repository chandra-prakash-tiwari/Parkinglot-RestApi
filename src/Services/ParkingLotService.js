import { UserService } from "./UserService"

export const parkingLotService={
    addParkingLot,
    hasParkingLot,
    addNewParking,
    getParkingLotByid,
    getIdByName
}

function addParkingLot(details){
    var digest=localStorage.getItem('digest');
    var token=localStorage.getItem('token');
    var data1 = {
        Title:details.name,
        Address:details.address
    }

    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingLots')/items";

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

function hasParkingSpace(name, type){

}

function getIdByName(name){
    var token=localStorage.getItem('token');
    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingLots')/items?";
    var query=`$filter=(Title eq '${name}')`;

    return fetch(url+query, {
        headers: { 
            Accept:'application/json;odata=nometadata',
            'Content-Type': 'application/json' ,
            Authorization:`Bearer ${token}`
        },
    }).then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            if(data.value.length >=1){
                return Promise.resolve(data.value[0]);
            } 
            else{
                return Promise.reject();
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

function hasParkingLot(name){
    var token=localStorage.getItem('token');
    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingLots')/items?";
    var query=`$filter=(Title eq '${name}')`;

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

function addNewParking(details){
    var digest=localStorage.getItem('digest');
    var token=localStorage.getItem('token');
    var data1 = {
        Title:details.name,
        Address:details.address
    }

    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingLots')/items";

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

function getParkingLotByid(id){
    var token=localStorage.getItem('token');
    var url=`https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingLotInfo')/items(${id})`;  
    return fetch(url, {
        headers: { 
            Accept:'application/json;odata=nometadata',
            'Content-Type': 'application/json' ,
            Authorization:`Bearer ${token}`
        },
    }).then(async response => {
        console.log(response)
        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            return Promise.resolve(data);
        }

        return Promise.reject();
    }).catch(error => {
        return error;
    })
}
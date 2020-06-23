import { UserService } from "./UserService";
import { parkingLotService } from "./ParkingLotService";

export const ParkingService={
    ParkedVehicle,
    ParkingSpaceId,
    ReleaseVehicle,
    allParkedVehicle,
    IsParked,
    getVehicleByVehicleNumber
}

function ParkedVehicle(details){
    var digest=localStorage.getItem('digest');
    var token=localStorage.getItem('token');
    console.log(UserService.currentUser)
    var data1 = {
        Title:details.number,
        EnterTime:new Date(),
        ParkingLotSpaceId:details.parkingLotId,
        ParkingLotId:UserService.currentUser.parkingLotId
    }
    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingInfo')/items";

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
        console.log(await r.json())
        if(r.status===201){
            return Promise.resolve("Ok");
        }
        return Promise.reject("Reject");
    });
}

function IsParked(vehicleNumber){
    var token=localStorage.getItem('token');
    var url=`https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingInfo')/items`;  
    var query=`?$filter=Title eq '${vehicleNumber}' and IsParked eq 1`
    return fetch(url+query, {
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
            if(data.value.length >= 0){
                return Promise.resolve(data.value[0]);
            } 
            Promise.reject();
        }

        return Promise.reject();
    }).catch(error => {
        return error;
    })
}

function ReleaseVehicle(vehicleNumber){
    var digest=localStorage.getItem('digest');
    var token=localStorage.getItem('token'); 
    return getVehicleByVehicleNumber(vehicleNumber).then(r=>{
        if(r!==undefined){
            parkingLotService.getParkingLotByid(r.ParkingLotSpaceId).then(r1=>{
                if(r1!==undefined){
                    var time=new Date();
                    var hour=Math.round((time - new Date(r.EnterTime))/3600000)+1;
                    var fare=hour*r1.Rate;
                    var url=`https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingInfo')/items(${r.ID})`;
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
                            IsParked:false,
                            Fare:fare,
                            ReleaseTime:time,
                            ManagerId:UserService.currentUser.id
                        })
                    }).then(async response => {
                        if (response.status === 204) {
                            return Promise.resolve(fare);
                        }
                        return Promise.resolve();
                    }).catch(error => {
                        return error;
                    })  
                }
            })   
        }
        return Promise.reject();
    })
}

function getVehicleByVehicleNumber(vehicleNumber){
    var token=localStorage.getItem('token');
    var url=`https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingInfo')/items`;  
    var query=`?$filter=Title eq '${vehicleNumber}' and IsParked eq 1`
    return fetch(url+query, {
        headers: { 
            Accept:'application/json;odata=nometadata',
            'Content-Type': 'application/json' ,
            Authorization:`Bearer ${token}`
        },
    }).then(async response => {
        console.log(response)
        if (response.status === 200) {
            const data = await response.json();
            if(data.value.length >= 0){
                return Promise.resolve(data.value[0]);
            } 
            Promise.reject();
        }

        return Promise.reject();
    }).catch(error => {
        return error;
    })
}

function ParkingSpaceId(type){
    console.log(UserService.currentUser.parkingLotId);
    var token=localStorage.getItem('token');
    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingLotInfo')/items?";
    var query=`$filter=(VehicalType eq '${type}') and (ParkingLotIdId eq '${UserService.currentUser.parkingLotId}')`;

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
                return Promise.resolve(data.value[0]);
            } 
            Promise.reject();
        }

        return Promise.reject();
    }).catch(error => {
        return error;
    })
}

function allParkedVehicle(){
    var token=localStorage.getItem('token');
    var url="https://chandraprakashtiwariv.sharepoint.com/sites/parkinglot/_api/lists/getbytitle('ParkingInfo')/items?";
    var query=`$filter=(ParkingLotId eq '${UserService.currentUser.parkingLotId}') and (IsParked eq '1')`;

    return fetch(url+query, {
        headers: { 
            Accept:'application/json;odata=nometadata',
            'Content-Type': 'application/json' ,
            Authorization:`Bearer ${token}`
        },
    }).then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            return Promise.resolve(data.value);
        }
        else if (response.status === 500) {
            return Promise.reject("servererror");
        }

        return Promise.reject();
    }).catch(error => {
        return error;
    })
}
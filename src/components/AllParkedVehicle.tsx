import * as React from 'react';
import { ParkingService } from '../Services/ParkingService';
import { Grid, Card } from '@material-ui/core';

export class AllVehicle{
    vehicles:[];

    constructor(){
        this.vehicles=[];
    }
}

export default class AllParkedVehicle extends React.Component<{},AllVehicle>{
    constructor(props:AllVehicle){
        super(props);
        this.state=new AllVehicle();
    }

    componentDidMount(){
        ParkingService.allParkedVehicle().then(r=>{
            if(r!==undefined&&r.length>0){
                this.setState({vehicles:r})
            }
        })
    }

    render(){
        const ParkedVehicle=this.state.vehicles!==null?(
            this.state.vehicles.map((vehicle:any,i)=>(
                <Card style={{width:'40%', display:"inline-block", margin:"10px", padding:"10px"}}>
                    <p>Vehicle number: {vehicle.Title}</p>
                    <p>Vehicle entry date: {vehicle.EnterTime.split("T")[0]}</p>
                    <p>Vehicle entry time: {vehicle.EnterTime.split("T")[1].split("Z")[0]}</p>
                </Card>
            ))
        ):'';

        return(
            <Grid>
                <h1>All Parked vehicle list is: </h1>
                {ParkedVehicle}
            </Grid>
        )
    }
}
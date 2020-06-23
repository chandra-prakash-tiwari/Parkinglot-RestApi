import * as React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { ParkingService } from '../Services/ParkingService';
import '../style/park-vehicle.css'

export class Vehicle{
    number:string;
    type:number;
    parkingAvailable:boolean;
    parkingLotId:number;
    isVehicleParked:boolean;

    constructor(){
        this.number='';
        this.type=0;
        this.parkingAvailable=false;
        this.parkingLotId=0;
        this.isVehicleParked=false;
    }
}

export default class ParkVehicle extends React.Component<{},Vehicle>{
    constructor(props:Vehicle){
        super(props);
        this.state=new Vehicle();
    }

    onChanges = (event: any) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    parkingAvailable=(value:any)=>{
        ParkingService.ParkingSpaceId(value).then(async r=>{
            if(r!==undefined){
                this.setState({parkingAvailable:true});
                this.setState({parkingLotId:r.ID})   
            }
            else{
                this.setState({parkingAvailable:false});
            }
        })
    }

    isVehicleParked=(value:string)=>{
        ParkingService.IsParked(value).then(async r=>{
            if(r!==undefined){
                this.setState({isVehicleParked:true})
            }
            else{
                this.setState({isVehicleParked:false})
            }
            console.log(r)
        })
    }

    onSubmit = (event:any) => {
        event?.preventDefault();
        ParkingService.ParkedVehicle(this.state).then(r=>{
            if(r==='Ok'){
                window.location.pathname='/manager';
            }
        })
    }

    render(){
        return(
            <div className='parked'>
                <form className='park-vehicle'>
                <div className='head'>
                    <h3 className='header'>Park vehicle</h3>
                </div>
                <div className='textbox'>
                    <TextField variant="filled" className='input' value={this.state.number} onChange={(event)=>{this.onChanges(event);this.isVehicleParked(event.target.value)}} name="number" type='text' label="Vehicle Number" style={{ display:"flex" }} autoFocus />
                </div>
                <div className='textbox'>
                    <TextField variant="filled" className='input' value={this.state.type} onChange={(event)=>{this.onChanges(event);this.parkingAvailable(event.target.value)}} name="type" type='number' label="Vehicle Type" style={{ display:"flex" }}/>
                </div>
                <div className='submit'>
                        <button type="submit" onClick={this.onSubmit} disabled={(!this.state.parkingAvailable)||this.state.isVehicleParked}><span> Submit </span></button>
                    </div>
                </form>
            </div>
        )
    }
}
import * as React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { ParkingService } from '../Services/ParkingService';
import '../style/release-vehicle.css'

export class Vehicle{
    number:string;
    type:number;
    vehicleId:number;
    isParked:boolean;

    constructor(){
        this.number='';
        this.type=0;
        this.vehicleId=0;
        this.isParked=false;
    }
}

export default class ReleaseVehicle extends React.Component<{},Vehicle>{
    constructor(props:Vehicle){
        super(props);
        this.state=new Vehicle();
    }

    onChanges = (event: any) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    isVehicleParked=(value:any)=>{
        ParkingService.IsParked(value).then(async r=>{
            if(r!==undefined){
                this.setState({isParked:true})
                this.setState({vehicleId:r.ID})
            }
            else{
                this.setState({isParked:false})
            }
        })
    }

    onSubmit=(event:any)=>{
        event.preventDefault();
        ParkingService.ReleaseVehicle(this.state.number).then(async r=>{
            console.log(r);
            if(r!==undefined){
                alert(r);
            }
        })
    }

    render(){
        return(
            <div className='release'>
                <form className='vehicle'>
                <div className='head'>
                    <h3 className='header'>Release vehicle</h3>
                </div>
                <div className='textbox'>
                    <TextField variant="filled" className='input' value={this.state.number} onChange={(event)=>{this.onChanges(event);this.isVehicleParked(event.target.value)}} name="number" type='text' label="Vehicle Number" style={{ display:"flex" }} autoFocus />
                </div>
                <div className='submit'>
                        <button type="submit" onClick={this.onSubmit} disabled={!this.state.isParked}><span> Submit </span></button>
                </div>
                </form>
            </div>
        )
    }
}
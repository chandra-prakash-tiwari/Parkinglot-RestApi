import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { parkingLotService } from '../Services/ParkingLotService';
import '../style/new-parking.css'

export class ParkingLot {
    name: string;
    vehicleType: string;
    space: number;
    rate: number;
    isValidLot:boolean;

    constructor() {
        this.name = '';
        this.vehicleType = '';
        this.space = 0;
        this.rate = 0;
        this.isValidLot=false;
    }
}

export default class AddNewParking extends React.Component<{}, ParkingLot>{
    constructor(props: ParkingLot) {
        super(props);
        this.state = new ParkingLot();
    }

    onChanges = (event: any) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

    isValidParkingLot=(value:string)=>{
        parkingLotService.hasParkingLot(value).then(response=>{
            this.setState({isValidLot:!response})
            console.log(response)
        })
    }

    isValidParkingSpace=()=>{

    }

    onSubmit = () => {
        parkingLotService.addNewParking(this.state).then(response=>{console.log(response)})
    }

    render() {
        return (
            <div className='parking'>
                <form className='new-parking'>
                <div className='head'>
                    <h3 className='header'>Add new parking area</h3>
                </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.name} onChange={(event)=>{this.onChanges(event);this.isValidParkingLot(event.target.value)}} name="name" type='text' label="Name " style={{ display: "flex" }} autoFocus />
                    </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.vehicleType} onChange={this.onChanges} name="vehicleType" type='number' label="VehicleType " style={{ display: "flex" }} />
                    </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.space} onChange={this.onChanges} name="space" type='number' label="Space " style={{ display: "flex" }} />
                    </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.rate} onChange={this.onChanges} name="rate" type='number' label="Rate" style={{ display: "flex" }} />
                    </div>
                    <div className='submit'>
                        <button type="submit" onClick={this.onSubmit} disabled={!this.state.isValidLot}><span> Submit </span></button>
                    </div>
                </form>
            </div>
        )
    }
}
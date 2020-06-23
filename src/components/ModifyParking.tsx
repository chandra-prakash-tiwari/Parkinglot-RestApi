import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
//import { ParkingLotService } from '../Services/ParkingLotService';

export class ParkingLot{
    name: string;
    vehicleType: string;
    space: number;
    rate: number;

    constructor() {
        this.name = '';
        this.vehicleType = '';
        this.space = 0;
        this.rate = 0;
    }
}

export default class ModifyParking extends React.Component<{}, ParkingLot>{
    constructor(props: ParkingLot) {
        super(props);
        this.state = new ParkingLot();
    }

    onChanges = (event: any) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

    onSubmit = () => {
        //ParkingLotService.AddParkingLot(this.state)
    }

    render() {
        return (
            <Grid>
                 <form className='addmember'>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.name} onChange={this.onChanges} name="name" type='text' label="Name " style={{ display: "flex" }} autoFocus />
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
                        <button type="submit" onClick={this.onSubmit}><span> Submit </span></button>
                    </div>
                </form>
            </Grid>
            )
    }
}
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { parkingLotService } from '../Services/ParkingLotService';
import '../style/parking-lot.css';

export class ParkingLot {
    name: string;
    address: string;
    isValidName:boolean;

    constructor() {
        this.name = '';
        this.address = '';
        this.isValidName=false;
    }
}

export default class AddParkingLot extends React.Component<{}, ParkingLot>{
    constructor(props: ParkingLot) {
        super(props);
        this.state = new ParkingLot();
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidName(value: string) {
        let emptyStatus = this.isEmpty(value);
        if(!emptyStatus){
            parkingLotService.hasParkingLot(value).then(response=>{
                this.setState({isValidName:response});
            })
        }
        console.log(emptyStatus)
        this.setState({isValidName:emptyStatus?false:true})
        return emptyStatus;
    }
    onChanges = (event: any) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        parkingLotService.addParkingLot(this.state).then(response=>{
            if(response==='Ok'){
                window.location.pathname='/admin'
            }
        })
    }

    render() {
        return (
            <div className='lot'>
                <form className='parkinglot'>
                <div className='head'>
                    <h3 className='header'>Add new parking lot</h3>
                </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.name} onChange={(event)=>{this.onChanges(event);this.isValidName(event.target.value)}} name="name" type='text' label="Name " style={{ display: "flex" }} autoFocus />
                    </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.address} onChange={this.onChanges} name="address" type='text' label="Address " style={{ display: "flex" }} />
                    </div>
                    <div className='submit'>
                        <button type="submit" onClick={this.onSubmit} disabled={!this.state.isValidName}><span> Submit </span></button>
                    </div>
                </form>
            </div>
        )
    }
}
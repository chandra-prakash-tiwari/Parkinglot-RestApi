import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import '../style/add-member.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { UserService } from '../Services/UserService';
import { parkingLotService } from '../Services/ParkingLotService';

export class Member {
    name: string;
    userName: string;
    password: string;
    repassword: string;
    address: string;
    type: string;
    parkingLot: string;
    parkinLotId:number;
    isValidParkingLot:boolean;
    passwordType: boolean;
    validUserName:boolean;

    constructor() {
        this.name = '';
        this.userName = '';
        this.password = '';
        this.repassword = '';
        this.address = '';
        this.type = '';
        this.parkingLot = '';
        this.validUserName=false;
        this.passwordType = true;
        this.parkinLotId=0;
        this.isValidParkingLot=true;
    }
}

export default class AddMember extends React.Component<{}, Member> {
    constructor(props: Member) {
        super(props);
        this.state = new Member();
    }

    onChanges = (event: any) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    onChangePasswordType = () => {
        this.setState({ passwordType: this.state.passwordType ? false : true })
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidUserName(value: string) {
        let emptyStatus = this.isEmpty(value);
        if(!emptyStatus){
            UserService.hasUserName(value).then(response=>{
                this.setState({validUserName:response});
            })
        }
        console.log(emptyStatus)
        this.setState({validUserName:emptyStatus?false:true})
        return emptyStatus;
    }

    isValidPassword(value: string) {
        let emptyStatus = this.isEmpty(value);
        //this.setState({ meta: { ...this.state.meta, passwordError: emptyStatus ? Required : "" } })
        return emptyStatus;
    }

    isValidParkingLot(value:any){
        parkingLotService.getIdByName(value).then((r:any)=>{
            if(r!==undefined){
                this.setState({isValidParkingLot:true});
                this.setState({parkinLotId:r.ID});
            }
            else{
                this.setState({isValidParkingLot:false})
            }
        })
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        UserService.addNewMember(this.state).then(r=>{
            if(r==='OK')
            window.location.pathname='/manager';
        })
    }

    render() {
        return (
            <div className='div'>
                <form className='addmember'>
                <div className='head'>
                    <h3 className='header'>Add new member</h3>
                </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.name} onChange={this.onChanges} name="name" type='text' label="Name " style={{ display: "flex" }} autoFocus />
                    </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.userName} onChange={(event)=>{this.onChanges(event); this.isValidUserName(event.target.value)}} name="userName" type='text' label="UserName" style={{ display: "flex" }} />
                    </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.password} onChange={this.onChanges} name="password" type={this.state.passwordType ? 'password' : 'text'} style={{ display: "flex" }} label="Enter Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' onClick={this.onChangePasswordType} >
                                        {this.state.passwordType ? <VisibilityIcon /> : <VisibilityOff />}
                                    </InputAdornment>
                                )
                            }} />
                    </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.repassword} onChange={this.onChanges} name="repassword" type='text' label="Re enter password" style={{ display: "flex" }}  />
                    </div>
                    <div className='textbox'>
                        <TextField variant="filled" className='input' value={this.state.address} onChange={this.onChanges} name="address" type='text' label="Address" style={{ display: "flex" }}  />
                    </div>
                    <FormControl component="fieldset" style={{ margin:'auto 6.3rem' }}>
                        <FormLabel component="legend">User Role</FormLabel>
                        <RadioGroup name="type" value={this.state.type} onChange={this.onChanges} style={{ display:'block' }}>
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                        </RadioGroup>
                    </FormControl>
                    {this.state.type === 'manager' ? <TextField variant="filled" className='input' value={this.state.parkingLot} onChange={(event)=>{this.onChanges(event);this.isValidParkingLot(event.target.value)}} name="parkingLot" type='text' label="Parking Lot Name" style={{ display: "flex" }} />:''}
                    <div className='submit'>
                        <button type="submit" onClick={this.onSubmit} disabled={!this.state.validUserName||!this.state.isValidParkingLot}><span> Submit </span></button>
                    </div>
                </form>
            </div>
        )
    }
}

import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import '../css/login.css'
import { UserService } from '../Services/UserService';

export class LoginProps {
    userName: string;
    password: string;
    passwordType: boolean;

    constructor() {
        this.userName = '';
        this.password = '';
        this.passwordType = true;
    }
}

export default class NewPassword extends React.Component<{}, LoginProps> {
    constructor(props: LoginProps) {
        super(props);
        this.state = new LoginProps();
    }

    onChanges = (event: any) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    onChangePasswordType = () => {
        this.setState({ passwordType: this.state.passwordType ? false : true })
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        UserService.newPassword(this.state.password).then(async response=>{
            if(response==='ok'){
                window.location.reload();
            }
            else{
                
            }
        })
    }

    render() {
        return (
            <Grid>
                <form className='login'>
                <div className='textbox'>
                    <TextField variant="filled" className='input' value={this.state.password} onChange={this.onChanges} name="password" type={this.state.passwordType ? 'password' : 'text'} style={{ display:"flex" }} label="New Password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end' onClick={this.onChangePasswordType} >
                                    {this.state.passwordType ? <VisibilityIcon /> : <VisibilityOff />}
                                </InputAdornment>
                            )
                        }} />
                </div>
                {/* <div className='textbox'>
                    <TextField variant="filled" className='input' value={this.state.userName} onChange={this.onChanges} name="userName" type='text' label="Enter Email or UserName Id " style={{ display:"flex" }} autoFocus />
                </div> */}
                    <div className='submit'>
                        <button type="submit" onClick={this.onSubmit}><span> Submit </span></button>
                    </div></form>
            </Grid>
        )
    }
}
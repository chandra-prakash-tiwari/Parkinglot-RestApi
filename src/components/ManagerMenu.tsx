import * as React from 'react';
import { Grid } from '@material-ui/core';
import '../style/ManagerMenu.css';
import { UserService } from '../Services/UserService';

export default class ManagerMenu extends React.Component {
    onLogout=()=>{
        UserService.logout();
        window.location.reload();
    }

    render() {
        return (
            <div className="menu">
            <div className='ManagerMenu'>
                <div className='Block' onClick={() => { window.location.pathname='/parkvehicle' }}>
                    <p className='Member'>Park vehicle</p>
                </div>
                <div className='Block' onClick={() => { window.location.pathname='/releasevehicle' }}>
                    <p className='Member'>Release vehicle</p>
                </div>
                <div className='Block' onClick={() => { window.location.pathname='/allparkedvehicle' }}>
                    <p className='Member'>View all parked vehicle</p>
                </div>
                <div className='Block' onClick={this.onLogout}>
                    <p className='Member'>Logout</p>
                </div>
            </div>
            </div>
            )
    }
}
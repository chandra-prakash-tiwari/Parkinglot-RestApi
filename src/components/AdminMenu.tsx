import * as React from 'react';
import '../style/AdminMenu.css';
import { UserService } from '../Services/UserService';

export default class AdminMenu extends React.Component {
    onLogout=()=>{
        UserService.logout();
        window.location.reload();
    }

    render() {
        return (
            <div className="Menu">
            <div className='AdminMenu'>
                <div className='Block'>
                    <p className='Member' onClick={() => { window.location.pathname='/addmember' }}>Add member</p>
                </div>
                <div className='Block'>
                    <p className='Member' onClick={() => { window.location.pathname = '/addparkinglot' }}>Add new parking lot</p>
                </div>
                <div className='Block'>
                    <p className='Member' onClick={() => { window.location.pathname = '/addparkingarea' }}>Add new vehicle parking in parking lot</p>
                </div>
                <div className='Block'>
                    <p className='Member' onClick={() => { window.location.pathname = '/modifyparkingarea' }}>Modify vehicle parking detail</p>
                </div>
                <div className='Block'>
                    <p className='Member' onClick={this.onLogout}>Logout</p>
                </div>
            </div>
            </div>
            )
    }
}

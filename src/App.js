import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login';
import AdminMenu from './components/AdminMenu';
import ManagerMenu from './components/ManagerMenu';
import AddMember from './components/AddMember';
import ParkVehicle from './components/ParkVehicle'
import ReleaseVehicle from './components/ReleaseVehicle'
import AddParkingLot from './components/AddParkingLot';
import AddNewParking from './components/AddNewParking'
import NewPassword from './components/NewPassword'
import './custom.css'
import { Grid } from '@material-ui/core';
import { UserService } from './Services/UserService';
import ModifyParking from './components/ModifyParking';
import AllParkedVehicle from './components/AllParkedVehicle';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <Router>
                {
                UserService.currentUser==null?
                <Grid className='app'>
                  <Switch>
                <Route exact path='/login' component={Login} />
                <Route path='/'>
                <Redirect to='/login'/>
                </Route></Switch>
                </Grid>
            :
            UserService.currentUser.firstTimeLogin?
            <Grid className='app'>{console.log(UserService.currentUser)}
              <Route path='/newpassword' component={NewPassword}/>
              <Route path='/'>
                <Redirect to='/newpassword'/>
                </Route>
            </Grid>:
            UserService.currentUser.role=="Admin"?
            <Switch>
            <Route exact path='/admin' component={AdminMenu} />
            <Route exact path='/addmember' component={AddMember} />
            <Route exact path='/addparkinglot' component={AddParkingLot} />
            <Route exact path='/addparkingarea' component={AddNewParking}/>
            <Route exact path='/modifyparkingarea' component={ModifyParking}/>
            <Route path='/'>
                <Redirect to='/admin'/>
                </Route>
            </Switch>
            :
            <Grid className='app'>{console.log(UserService.currentUser)}
            <Switch>
            <Route exact path='/manager' component={ManagerMenu}/>
            <Route exact path='/parkvehicle' component={ParkVehicle}/>
            <Route exact path='/releasevehicle' component={ReleaseVehicle}/>
            <Route exact path='/allparkedvehicle' component={AllParkedVehicle}/>
            <Route path='/'>
                <Redirect to='/manager'/>
                </Route></Switch>
                </Grid>
              }
          </Router>
    );
  }
}

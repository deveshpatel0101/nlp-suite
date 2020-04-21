import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import DisplaySnackBar from './components/DisplaySnackBar/DisplaySnackBar';
import Profile from './components/Profile/Profile';
import checkAuth from './components/Auth/Auth';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import ResetPassword from './components/ResetPassword/ResetPassword';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route
              path='/'
              render={() => (
                <Fragment>
                  <Home />
                  <Footer />
                </Fragment>
              )}
              exact={true}
            />
            <Route path='/user/register' component={checkAuth(Register, 'register')} exact={true} />
            <Route path='/user/verify' component={VerifyEmail} exact={true} />
            <Route path='/user/login' component={checkAuth(Login, 'login')} exact={true} />
            <Route path='/dashboard' component={checkAuth(Dashboard)} exact={true} />
            <Route path='/user/profile' component={checkAuth(Profile)} exact={true} />
            <Route path='/user/resetPassword' component={ResetPassword} exact={true} />
          </Switch>
        </BrowserRouter>
        <DisplaySnackBar />
      </div>
    );
  }
}

export default App;

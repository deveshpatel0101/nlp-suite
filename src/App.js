import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import DisplaySnackBar from './components/DisplaySnackBar/DisplaySnackBar';
import CheckAuth from './components/Auth/Auth';

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
            <Route path='/user/register' component={CheckAuth(Register, 'register')} exact={true} />
            <Route path='/user/login' component={CheckAuth(Login, 'login')} exact={true} />
            <Route path='/dashboard' component={CheckAuth(Dashboard)} exact={true} />
          </Switch>
        </BrowserRouter>
        <DisplaySnackBar />
      </div>
    );
  }
}

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Auth.css';

import Navbar from '../Navbar/Navbar';
import { LinearProgress } from '@material-ui/core';

import { getProjects } from '../../controllers/projects';
import { errorMessage } from '../../redux/actions/message';
import { pushProject } from '../../redux/actions/projects';
import { userLogOut, userLogin } from '../../redux/actions/auth';

const RequireAuth = (WrappedComponent, route) => {
  class Auth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        validating: true,
      };
    }

    componentDidMount() {
      if (this.props.auth) {
        this.setState({ validating: false });
      } else if (localStorage.getItem('jwt')) {
        getProjects().then((data) => {
          const { error, errorType, errorMessage: errorMsg, results } = data;
          if (!error) {
            this.props.dispatch(pushProject(results.projects));
            this.props.dispatch(userLogin({ ...results.userData }));
            this.setState({ validating: false });
          } else if (errorType === 'token' || errorType === 'server') {
            this.props.dispatch(userLogOut());
            if (errorType === 'token') {
              this.props.dispatch(errorMessage('Please log in to continue'));
            } else {
              this.props.dispatch(errorMessage(errorMsg));
            }
            this.setState({ redirect: true });
          }
        });
      } else {
        this.setState({ validating: false, redirect: true });
      }
    }

    render() {
      // if user is authenticated and is on the login or register route, then redirect to dashboard
      if (
        !this.state.validating &&
        this.props.auth &&
        (route === 'login' || route === 'register')
      ) {
        return <Redirect to='/dashboard' />;
      }

      // if user is not authenticated and is on the route which requires authentication, then redirect to login
      if (
        !this.state.validating &&
        !this.props.auth &&
        !(route === 'login' || route === 'register')
      ) {
        return <Redirect to='/user/login' />;
      }

      // if user is not authenticated and is on the login or register route, then render the component
      if (this.state.redirect && !this.props.auth && (route === 'login' || route === 'register')) {
        return (
          <React.Fragment>
            <Navbar route={route} />
            <WrappedComponent />
          </React.Fragment>
        );
      }

      // if user is authenticated and is on the route which requires authentication, then render the component
      return (
        <div className='Auth-Container'>
          <Navbar />
          {this.state.validating && <LinearProgress />}
          {this.props.auth && <WrappedComponent />}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.user.auth,
    };
  };

  return connect(mapStateToProps)(Auth);
};

export default RequireAuth;

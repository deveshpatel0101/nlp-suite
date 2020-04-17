import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import './Dashboard.css';

import Navbar from '../Navbar/Navbar';
import Projects from '../Projects/Projects';
import { errorMessage, successMessage } from '../../redux/actions/message';
import { pushProject } from '../../redux/actions/projects';
import { userLogOut, userLogin } from '../../redux/actions/auth';
import { getProjects } from '../../controllers/projects';
import { verifyEmail } from '../../controllers/verifyEmail';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showProject: false,
      redirect: false,
      validating: true,
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    if (auth) {
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
      this.setState({ redirect: true });
    }
  }

  handleVerifyEmail = () => {
    verifyEmail().then((res) => {
      if (!res.error) {
        this.props.dispatch(successMessage('Verification email sent. Please check your inbox!'));
      } else {
        this.props.dispatch(errorMessage(res.errorMessage));
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/user/login' />;
    } else if (!this.props.auth && !this.state.validating) {
      return <Redirect to='/user/login' />;
    }

    const { validating } = this.state;
    return (
      <div className='Dashboard'>
        <Navbar />
        {validating && <LinearProgress />}
        {!validating && !this.props.isVerified && (
          <div className='Verify-Email'>
            <div>Please verify your email first before you create any project.</div>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              className='Verify-Email-Button'
              onClick={this.handleVerifyEmail}
            >
              Verify Email
            </Button>
          </div>
        )}
        {!validating && this.props.isVerified && (
          <div className='Content'>
            <Projects />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.user.auth, isVerified: state.user.isVerified };
};

export default connect(mapStateToProps)(Dashboard);

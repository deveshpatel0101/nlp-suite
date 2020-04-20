import React from 'react';
import './VerifyEmail.css';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import Navbar from '../Navbar/Navbar';
import { verifyEmail } from '../../controllers/verifyEmail';
import { successMessage, errorMessage } from '../../redux/actions/message';
import { Redirect } from 'react-router-dom';

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validating: true,
      redirect: false,
    };
  }

  componentDidMount() {
    const href = window.location.href;
    const reg = new RegExp('[?&]token=([^&#]*)', 'i');
    const string = reg.exec(href);
    const token = string ? string[1] : null;
    if (!token) {
      this.props.dispatch(errorMessage('Invalid token or broken link. Email verification failed.'));
      this.setState({ validating: false, redirect: true });
      return;
    }

    verifyEmail(token).then((res) => {
      if (!res.error) {
        this.props.dispatch(successMessage('Email verified successfully.'));
      } else if (res.errorType === 'token') {
        this.props.dispatch(
          errorMessage('Invalid token or broken link. Email verification failed.'),
        );
      } else if (res.errorType === 'user') {
        this.props.dispatch(errorMessage('User does not exist.'));
      } else {
        this.props.dispatch(errorMessage(res.errorMessage));
      }
      this.setState({ validating: false, redirect: true });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/user/login' />;
    }

    return (
      this.state.validating && (
        <React.Fragment>
          <Navbar />
          <LinearProgress />
        </React.Fragment>
      )
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(VerifyEmail);

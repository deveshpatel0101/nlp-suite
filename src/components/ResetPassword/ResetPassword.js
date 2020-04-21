import React, { Component, Fragment } from 'react';
import './ResetPassword.css';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../Navbar/Navbar';
import { resetPassword, resetPasswordLink } from '../../controllers/resetPassword';
import { errorMessage, successMessage } from '../../redux/actions/message';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
);

const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,}$/);

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      validating: false,
      email: '',
      password: '',
      confirmPassword: '',
      errorMessageEmail: false,
      errorMessagePassword: false,
      errorMessageConfirmPassword: false,
    };
  }

  componentDidMount() {
    const href = window.location.href;
    const reg = new RegExp('[?&]token=([^&#]*)', 'i');
    const string = reg.exec(href);
    const token = string ? string[1] : null;
    if (token) {
      window.history.pushState(document.body.innerHTML, document.title, '/user/resetPassword');
      this.setState({ token });
    }
  }

  handleChangeEmail = (e) => {
    const value = e.target.value;
    let error = false;
    if (!value) {
      error = 'This field is required.';
    } else if (!emailRegex.test(value)) {
      error = 'Invalid Email.';
    }
    this.setState({
      errorMessageEmail: error,
    });
  };

  handleChangePassword = (e) => {
    const value = e.target.value;
    let error = false;
    if (!value) {
      error = 'This field is required.';
    } else if (!passwordRegex.test(value)) {
      error =
        'Password should contain: 6 characters, 1 uppercase letter and 1 special or numeric character.';
    }
    this.setState({
      errorMessagePassword: error,
    });
  };

  handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    let error = '';
    if (!value) {
      error = 'This field is required.';
    } else if (this.state.password !== value) {
      error = 'Both passwords should match.';
    }
    this.setState({
      errorMessageConfirmPassword: error,
    });
  };

  handleFieldChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  isDisabled = () => {
    const { token, email, password, confirmPassword } = this.state;
    if (!token && !emailRegex.test(email)) {
      return true;
    } else if (token) {
      if (!passwordRegex.test(password)) {
        return true;
      } else if (password !== confirmPassword) {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.isDisabled()) {
      return;
    }

    this.setState({ validating: true });

    if (!this.state.token) {
      resetPasswordLink({ email: this.state.email }).then((res) => {
        this.setState({ validating: false });
        if (!res.error) {
          this.props.dispatch(
            successMessage('Reset password link has been sent to your mail if the account exists.'),
          );
        }
      });
    } else {
      const { password, confirmPassword, token } = this.state;
      resetPassword({ password, confirmPassword }, token).then((res) => {
        this.setState({ validating: false });
        if (!res.error) {
          this.props.dispatch(successMessage('Password updated successfully, login to continue.'));
          this.setState({ redirect: 'login' });
        } else if (res.errorType === 'password') {
          this.setState({ errorMessagePassword: 'New password cannot be same as old password.' });
        } else if (res.errorType === 'token') {
          this.prop.dispatch(
            errorMessage('Invalid token or broken link. Send a new reset password email.'),
          );
          this.setState({ redirect: 'resetPassword' });
        }
      });
    }
  };

  toRender = () => {
    const {
      token,
      errorMessageEmail,
      errorMessagePassword,
      errorMessageConfirmPassword,
    } = this.state;

    if (!token) {
      return (
        <div className='Reset-Password-Email'>
          <TextField
            label='Email *'
            margin='dense'
            name='email'
            variant='outlined'
            error={errorMessageEmail ? true : false}
            helperText={errorMessageEmail}
            onBlur={this.handleChangeEmail}
            onChange={this.handleFieldChange}
          />
        </div>
      );
    }

    return (
      <div className='Reset-Password-Update-Password'>
        <div>
          <TextField
            label='Password *'
            name='password'
            type='password'
            margin='dense'
            variant='outlined'
            error={errorMessagePassword ? true : false}
            helperText={errorMessagePassword}
            onBlur={this.handleChangePassword}
            onChange={this.handleFieldChange}
          />
        </div>
        <div>
          <TextField
            label='Password *'
            name='confirmPassword'
            type='password'
            margin='dense'
            variant='outlined'
            error={errorMessageConfirmPassword ? true : false}
            helperText={errorMessageConfirmPassword}
            onBlur={this.handleChangeConfirmPassword}
            onChange={this.handleFieldChange}
          />
        </div>
      </div>
    );
  };

  render() {
    const isDisabled = this.isDisabled();
    const { redirect } = this.state;

    if (redirect === 'login') {
      return <Redirect to='/user/login' />;
    } else if (redirect === 'resetPassword') {
      return <Redirect to='/user/resetPassword' />;
    }

    return (
      <Fragment>
        <Navbar show />
        <div className='Reset-Password-Container'>
          <form className='Reset-Password-Form' onSubmit={this.handleSubmit}>
            {this.toRender()}
            <div className='Reset-Password-Button'>
              <Button
                variant='contained'
                type='submit'
                size='small'
                color='primary'
                disabled={isDisabled}
              >
                {this.state.validating ? (
                  <Fragment>
                    <CircularProgress size={24} thickness={5} style={{ color: 'white' }} />
                    &nbsp; Submitting
                  </Fragment>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ResetPassword);

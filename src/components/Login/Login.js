import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './Login.css';

import { signin } from '../../controllers/signin';
import { pushProject } from '../../redux/actions/projects';
import { userLogin } from '../../redux/actions/user';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessageEmail: '',
      errorMessagePassword: '',
      validating: false,
    };
  }

  handleChangeEmail = (e) => {
    const value = e.target.value;
    let error = '';
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
    let error = '';
    if (!value) {
      error = 'This field is required.';
    }
    this.setState({
      errorMessagePassword: error,
    });
  };

  handleFieldChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  isDisabled = () => {
    const { email, password } = this.state;
    if (!emailRegex.test(email)) {
      return true;
    } else if (!password) {
      return true;
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.isDisabled()) {
      const data = { email: this.state.email, password: this.state.password };
      this.setState({ validating: true });
      signin(data).then((res) => {
        if (!res.error) {
          localStorage.setItem('jwt', res.jwtToken);
          this.props.dispatch(pushProject(res.results.projects));
          this.props.dispatch(userLogin({ ...res.results.userData }));
        } else {
          if (res.errorType === 'email') {
            this.setState({ errorMessageEmail: res.errorMessage });
          } else if (res.errorType === 'password') {
            this.setState({ errorMessagePassword: res.errorMessage });
          } else {
            alert('Interal Server error.');
          }
          this.setState({ validating: false });
        }
      });
    }
  };

  render() {
    const isDisabled = this.isDisabled();

    const { errorMessageEmail, errorMessagePassword, validating } = this.state;

    return (
      <div className='Signin-Container'>
        <div className='Avatar'>
          <LockOutlinedIcon />
        </div>
        <div className='Signin-Header'>
          <Typography variant='h5'>Login</Typography>
        </div>
        <div className='Signin-Form-Container'>
          <form noValidate onSubmit={this.handleSubmit}>
            <div className='Signin-Email'>
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

            <div className='Signin-Password'>
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

            <div className='Signin-Button'>
              <Button
                variant='contained'
                type='submit'
                size='medium'
                color='primary'
                disabled={isDisabled}
              >
                {validating ? (
                  <Fragment>
                    <CircularProgress
                      size={24}
                      thickness={5}
                      style={{ color: 'white' }}
                    />
                    &nbsp; Trying to log you in
                  </Fragment>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>

            <div>
              <Typography color='primary' className='Signin-Forget' variant='body2'>
                Forget password?
              </Typography>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Login);

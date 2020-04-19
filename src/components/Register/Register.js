import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import './Register.css';

import { signup } from '../../controllers/signup';
import { successMessage, errorMessage } from '../../redux/actions/message';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
);

const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,}$/);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      validating: false,
      redirect: '',
      whiteLoader: false,
      errorMessageFirstName: '',
      errorMessageLastName: '',
      errorMessageEmail: '',
      errorMessagePassword: '',
      errorMessageConfirmPassword: '',
    };
  }

  handleChangeFirstName = (e) => {
    const value = e.target.value;
    let error = '';
    if (!value) {
      error = 'This field is required.';
    } else if (value.length < 3) {
      error = 'Firstname should be at least 3 characters long.';
    } else {
      error = false;
    }
    this.setState({
      errorMessageFirstName: error,
    });
  };

  handleChangeLastName = (e) => {
    const value = e.target.value;
    let error = '';
    if (!value) {
      error = 'This field is required.';
    } else if (value.length < 3) {
      error = 'Lastname should be at least 3 characters long.';
    } else {
      error = '';
    }
    this.setState({
      errorMessageLastName: error,
    });
  };

  handleChangeEmail = (e) => {
    const value = e.target.value;
    let error = '';
    if (!value) {
      error = 'This field is required.';
    } else if (!emailRegex.test(value)) {
      error = 'Invalid Email.';
    } else {
      error = '';
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
    } else if (!passwordRegex.test(value)) {
      error =
        'Password should contain: 6 characters, 1 uppercase letter and 1 special or numeric character.';
    } else {
      error = '';
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
    } else if (value !== this.state.password) {
      error = 'Both passwords does not match';
    } else {
      error = '';
    }
    this.setState({
      errorMessageConfirmPassword: error,
    });
  };

  handleFieldChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  checkDisabled = () => {
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    if (firstName.length < 3 || lastName.length < 3) {
      return true;
    } else if (!emailRegex.test(email)) {
      return true;
    } else if (
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      !passwordRegex.test(password)
    ) {
      return true;
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isWrong = this.checkDisabled();
    if (isWrong) {
      return;
    }

    const { firstName, lastName, email, password, confirmPassword } = this.state;
    let data = {
      fname: firstName,
      lname: lastName,
      email,
      password,
      confirmPassword: confirmPassword,
    };

    this.setState({ validating: true, whiteLoader: true });

    signup(data).then((data) => {
      if (!data.error) {
        this.props.dispatch(successMessage('Signup Successful! You can now login.'));
        this.setState({ redirect: true });
      } else {
        this.setState({ validating: false });
        if (data.errorType === 'fname') {
          this.setState({ errorMessageFirstName: data.errorMessage });
        } else if (data.errorType === 'lname') {
          this.setState({ errorMessageLastName: data.errorMessage });
        } else if (data.errorType === 'email') {
          this.setState({ errorMessageEmail: data.errorMessage });
        } else if (data.errorType === 'password') {
          this.setState({ errorMessagePassword: data.errorMessage });
        } else if (data.errorType === 'cpassword') {
          this.setState({ errorMessageConfirmPassword: data.errorMessage });
        } else if (data.errorType === 'server') {
          this.props.dispatch(errorMessage(data.errorMessage));
        }
      }
    });
  };

  render() {
    let isDisabled = this.checkDisabled();
    const {
      errorMessageFirstName,
      errorMessageLastName,
      errorMessageEmail,
      errorMessagePassword,
      errorMessageConfirmPassword,
      validating,
      redirect,
      whiteLoader,
    } = this.state;

    if (redirect) {
      return <Redirect to='/user/login' />;
    }

    return (
      <div className='Signup'>
        <div className='Avatar'>
          <LockOutlinedIcon />
        </div>
        <div className='Signup-Header'>
          <Typography variant='h5'>Register</Typography>
        </div>
        <div className='Form-Container'>
          <form className='Signup-Form' onSubmit={this.handleSubmit} noValidate>
            <div className='Name'>
              <div className='Firstname'>
                <TextField
                  label='Firstname *'
                  name='firstName'
                  margin='dense'
                  variant='outlined'
                  error={errorMessageFirstName ? true : false}
                  helperText={errorMessageFirstName}
                  onBlur={this.handleChangeFirstName}
                  onChange={this.handleFieldChange}
                />
              </div>

              <div className='Lastname'>
                <TextField
                  label='Lastname *'
                  name='lastName'
                  margin='dense'
                  variant='outlined'
                  error={errorMessageLastName ? true : false}
                  helperText={errorMessageLastName}
                  onBlur={this.handleChangeLastName}
                  onChange={this.handleFieldChange}
                />
              </div>
            </div>

            <div className='Email'>
              <TextField
                label='Email *'
                type='email'
                name='email'
                margin='dense'
                variant='outlined'
                fullWidth={true}
                error={errorMessageEmail ? true : false}
                helperText={errorMessageEmail}
                onBlur={this.handleChangeEmail}
                onChange={this.handleFieldChange}
              />
            </div>

            <div className='Password'>
              <TextField
                label='Password *'
                type='password'
                name='password'
                margin='dense'
                variant='outlined'
                fullWidth={true}
                error={errorMessagePassword ? true : false}
                helperText={errorMessagePassword}
                onBlur={this.handleChangePassword}
                onChange={this.handleFieldChange}
              />
            </div>

            <div className='Confirm-Password'>
              <TextField
                label='Confirm Password *'
                type='password'
                name='confirmPassword'
                margin='dense'
                variant='outlined'
                fullWidth={true}
                error={errorMessageConfirmPassword ? true : false}
                helperText={errorMessageConfirmPassword}
                onBlur={this.handleChangeConfirmPassword}
                onChange={this.handleFieldChange}
              />
            </div>

            <div className='Signup-Button'>
              <Button
                variant='contained'
                size='medium'
                color='primary'
                className='sign-button-inside'
                type='submit'
                disabled={isDisabled}
              >
                {validating ? (
                  <Fragment>
                    <CircularProgress
                      size={24}
                      thickness={5}
                      style={whiteLoader ? { color: 'white' } : {}}
                    />
                    &nbsp;Signing up
                  </Fragment>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>

            <Typography color='primary' variant='body1'>
              <Link to='./login' className='Signup-Forget'>
                Already have an account? Login
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.user.auth };
};

export default connect(mapStateToProps)(Register);

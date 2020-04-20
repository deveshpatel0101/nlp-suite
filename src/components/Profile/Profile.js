import React from 'react';
import { connect } from 'react-redux';
import { TextField, CircularProgress, Button } from '@material-ui/core';
import './Profile.css';

import { updateProfile } from '../../controllers/profile';
import { updateUserProfile, userLogOut } from '../../redux/actions/user';
import { successMessage } from '../../redux/actions/message';

const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,}$/);

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      validating: false,
      fname: this.props.userData.fname,
      lname: this.props.userData.lname,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      errorMessageFirstName: false,
      errorMessageLastName: false,
      errorMessageOldPassword: false,
      errorMessageNewPassword: false,
      errorMessageConfirmNewPassword: false,
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

  handleChangeOldPassword = (e) => {
    const value = e.target.value;
    this.setState({ oldPassword: value });
  };

  handleChangeNewPassword = (e) => {
    const value = e.target.value;
    let error = false;
    if (this.state.oldPassword && !value) {
      error = 'This field is required!';
    } else if (!passwordRegex.test(value)) {
      error =
        'Password should contain: 6 characters, 1 uppercase letter and 1 special or numeric character.';
    } else if (this.state.oldPassword === value) {
      error = 'New password cannot be same as old password';
    }
    this.setState({ errorMessageNewPassword: error });
  };

  handleChangeConfirmNewPassword = (e) => {
    const value = e.target.value;
    let error = false;
    if (this.state.oldPassword && this.state.newPassword !== value) {
      error = 'Both new passwords should match!';
    }
    this.setState({ errorMessageConfirmNewPassword: error });
  };

  handleFieldChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value, change: true });
  };

  isDisabled = () => {
    const { change, fname, lname, oldPassword, newPassword, confirmNewPassword } = this.state;

    if (!change) {
      return true;
    } else if (!fname || fname.length < 3) {
      return true;
    } else if (!lname || lname.length < 3) {
      return true;
    } else if (oldPassword && !newPassword) {
      return true;
    } else if (oldPassword && newPassword && newPassword !== confirmNewPassword) {
      return true;
    } else if (oldPassword && oldPassword === newPassword) {
      return true;
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isDisabled()) {
      return;
    }

    const { fname, lname, oldPassword, newPassword, confirmNewPassword } = this.state;
    const toSubmit = { fname: fname.trim(), lname: lname.trim() };
    const { userData } = this.props;
    if (oldPassword) {
      toSubmit.oldPassword = oldPassword;
      toSubmit.newPassword = newPassword;
      toSubmit.confirmNewPassword = confirmNewPassword;
    }

    // no change is required;
    if (!oldPassword && userData.fname === toSubmit.fname && userData.lname === toSubmit.lname) {
      this.setState({
        change: false,
        fname: toSubmit.fname,
        lname: toSubmit.lname,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      this.props.dispatch(successMessage('Profile updated successfully.'));
      return;
    }

    this.setState({ validating: true });
    updateProfile(toSubmit).then((res) => {
      const { error, errorType } = res;
      if (!error) {
        this.props.dispatch(updateUserProfile({ fname, lname }));
        this.props.dispatch(successMessage('Profile updated successfully.'));
        this.setState({
          fname: toSubmit.fname,
          lname: toSubmit.lname,
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        this.setState({ validating: false });
      } else if (errorType === 'oldPassword') {
        this.setState({ errorMessageOldPassword: 'Wrong Password' });
        this.setState({ validating: false });
      } else {
        this.props.dispatch(userLogOut());
      }
    });
  };

  render() {
    const {
      validating,
      fname,
      lname,
      oldPassword,
      newPassword,
      confirmNewPassword,
      errorMessageFirstName,
      errorMessageLastName,
      errorMessageOldPassword,
      errorMessageNewPassword,
      errorMessageConfirmNewPassword,
    } = this.state;

    const isDisabled = this.isDisabled();

    return (
      <div className='Profile-Container'>
        <form onSubmit={this.handleSubmit} className='Profile-Form'>
          <div className='Name'>
            <div className='First-Name'>
              <TextField
                label='Firstname'
                name='fname'
                value={fname}
                margin='dense'
                variant='outlined'
                error={errorMessageFirstName ? true : false}
                helperText={errorMessageFirstName}
                onBlur={this.handleChangeFirstName}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className='Last-Name'>
              <TextField
                label='Lastname'
                name='lname'
                value={lname}
                margin='dense'
                variant='outlined'
                error={errorMessageLastName ? true : false}
                helperText={errorMessageLastName}
                onBlur={this.handleChangeLastName}
                onChange={this.handleFieldChange}
              />
            </div>
          </div>
          <div className='Old-Password'>
            <TextField
              label='Old Password'
              type='password'
              name='oldPassword'
              value={oldPassword}
              margin='dense'
              variant='outlined'
              fullWidth={true}
              error={errorMessageOldPassword ? true : false}
              helperText={errorMessageOldPassword}
              onBlur={this.handleChangeOldPassword}
              onChange={this.handleFieldChange}
            />
          </div>
          <div className='New-Password'>
            <TextField
              label='New Password'
              type='password'
              name='newPassword'
              value={newPassword}
              margin='dense'
              variant='outlined'
              fullWidth={true}
              error={errorMessageNewPassword ? true : false}
              helperText={errorMessageNewPassword}
              onBlur={this.handleChangeNewPassword}
              onChange={this.handleFieldChange}
            />
          </div>
          <div className='Confirm-New-Password'>
            <TextField
              label='Confirm New Password'
              type='password'
              name='confirmNewPassword'
              value={confirmNewPassword}
              margin='dense'
              variant='outlined'
              fullWidth={true}
              error={errorMessageConfirmNewPassword ? true : false}
              helperText={errorMessageConfirmNewPassword}
              onBlur={this.handleChangeConfirmNewPassword}
              onChange={this.handleFieldChange}
            />
          </div>
          <div className='Update-Button'>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              type='submit'
              disabled={isDisabled}
            >
              {validating ? (
                <React.Fragment>
                  <CircularProgress size={24} thickness={5} style={{ color: 'white' }} />
                  &nbsp;Updating
                </React.Fragment>
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps)(Profile);

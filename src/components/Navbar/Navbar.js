import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Popper,
  List,
  ListItem,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';

import { userLogOut } from '../../redux/actions/user';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  handleMenu = (e) => {
    this.setState({ open: !this.state.open, anchorEl: e.currentTarget });
  };

  handleLogout = () => {
    this.props.dispatch(userLogOut());
  };

  render() {
    return (
      <div className='Menu-Container'>
        <AppBar position='static' className='Menu-Bar'>
          <Toolbar>
            <div className='Header-Name'>
              <Typography variant='h6'>NLP-Suite</Typography>
            </div>
            {this.props.auth && (
              <div className='Navbar-Avatar-Icon'>
                <IconButton onClick={this.handleMenu} color='inherit' size='small'>
                  <Avatar>{String(this.props.fname)[0].toUpperCase()}</Avatar>
                </IconButton>
                <Popper
                  open={this.state.open}
                  anchorEl={this.state.anchorEl}
                  onClose={this.handleMenu}
                  anchororigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformorigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  className='Menu-Popper'
                >
                  <List className='Navbar-Avatar-List'>
                    <Link to='/dashboard'>
                      <ListItem button>Dashboard</ListItem>
                    </Link>
                    <Link to='/user/profile'>
                      <ListItem button>Profile</ListItem>
                    </Link>
                    <Link to='/user/billing'>
                      <ListItem button>Billing</ListItem>
                    </Link>
                    <Link to='#' onClick={this.handleLogout}>
                      <ListItem button>Logout</ListItem>
                    </Link>
                  </List>
                </Popper>
              </div>
            )}
            {!this.props.auth && (
              <div className='Header-SignIn-SignUp-Buttons'>
                {(this.props.route === 'register' ||
                  this.props.route === 'home' ||
                  this.props.show) && (
                  <Link to='/user/login'>
                    <Button size='small'>Login</Button>
                  </Link>
                )}

                {(this.props.route === 'login' ||
                  this.props.route === 'home' ||
                  this.props.show) && (
                  <Link to='/user/register'>
                    <Button size='small'>Register</Button>
                  </Link>
                )}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    fname: state.user.fname,
  };
};

export default connect(mapStateToProps)(Navbar);

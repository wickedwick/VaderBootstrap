import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';
import { loginUser, logoutUser } from '../actions';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
    render () {
        const { dispatch, isAuthenticated, errorMessage } = this.props;
        
        return (
            <nav className="navbar navbar-default navbar-static-top navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="/">Vader Bootstrap 1.0</a>
                    </div>
                    <div className="navbar-form navbar-right">

                        {!isAuthenticated &&
                        <Login
                            errorMessage={errorMessage}
                            onLoginClick={creds => dispatch(loginUser(creds))}
                        />
                        }

                        {isAuthenticated &&
                        <Logout onLogoutClick={() => dispatch(logoutUser())} />
                        }

                    </div>
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};
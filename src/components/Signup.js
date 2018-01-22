import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Jumbotron from '../components/Jumbotron';

export default class Signup extends Component {
    handleClick(event) {
        const emailAddress = this.refs.emailAddress;
        const password = this.refs.password;
        const confirmPassword = this.refs.confirmPassword;
        const signupObj = { emailAddress: emailAddress.value.trim(), password: password.value.trim(), confirmPassword: confirmPassword.value.trim() };
        this.props.onSignupClick(signupObj);
    }

    render() {
        return (
            <div>
                <Jumbotron username="" isAuthenticated="false" />
                <div className="home-container-1 container-bg">
                    <div className="container navbar-margin-offset">
                        <div className="col-xs-12 col-md-8 col-lg-6 centered">
                            <h1>Signup</h1>
                            <div className="col-md-6">
                                <input type="text" ref="emailAddress" className="form-control" name="emailAddress" id="emailAddress" placeholder="Email Address" />
                                <input type="password" ref="password" className="form-control" name="password" id="password" placeholder="Password" />
                                <input type="password" ref="confirmPassword" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                                <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
                                    Signup
                                </button>
                            </div>                    
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    onSignupClick: PropTypes.func.isRequired
}
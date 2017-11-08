import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Jumbotron extends Component {
    render() {
        const { username, isAuthenticated } = this.props;
        return (
            <div className="container-fluid navbar-margin-offset">
                <div className="jumbotron text-center">
                <h1>Hello { isAuthenticated ? username : ''}</h1>
                <h2>This is a base application with common features</h2>
                <h3>Your site will be designed and will have content added soon</h3>
                </div>
            </div>
        );
    }
}

Jumbotron.propTypes = {
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool
};
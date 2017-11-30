import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Admin extends Component {
    render() {
        const { isAuthenticated, role, username } = this.props;

        return (
            <div>
                {!isAuthenticated && (role !== 'Vader' && role !== 'Emperor') &&
                    <div className="container-fluid navbar-margin-offset">
                        <div className="jumbotron text-center">
                        <h1>Uh oh!</h1>
                        <h2>This area is for website administrators only.</h2>
                        <h3>Please visit another page or sign with your administrator account if you have one.</h3>
                        </div>
                    </div>
                }

                {isAuthenticated &&
                    <div className="container-fluid navbar-margin-offset">
                        <div className="jumbotron text-center">
                        <h1>Hello { isAuthenticated ? username : ''}</h1>
                        <h2>This is the administration section.</h2>
                        <h3>See the areas below to make changes to your site.</h3>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Admin.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    role: PropTypes.string,
    username: PropTypes.string
};
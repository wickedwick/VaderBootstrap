import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';

export default class Home extends Component {
    render() {
        const { username, isAuthenticated } = this.props;
        
        return (
            <div>
                <Jumbotron username={username}
                    isAuthenticated={isAuthenticated}
                />
                <div className="container-fluid navbar-margin-offset">
                    <div className="col-xs-12">
                        <h1>This is your homepage</h1>
                    </div>
                </div>
                <Footer clientName="Stuff"/>
            </div>
        );
    }
}

Home.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string
};
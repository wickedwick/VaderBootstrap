import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Jumbotron from '../components/Jumbotron';
import GalleryComponent from '../components/GalleryComponent';
import { fetchGallery } from '../actions';

export default class Home extends Component {
    render() {
        const { images, username, isAuthenticated } = this.props;

        return (
            <div>
                <Jumbotron username={username}
                    isAuthenticated={isAuthenticated}
                />
                <div className="home-container-1 container-bg">
                    <div className="container navbar-margin-offset">
                        <div className="col-xs-12 main-content">
                            <h1>Welcome to your homepage</h1>
                            <GalleryComponent title="Gallery components are included." imageArray={images}/>
                        </div>
                        <div className="spacer">&nbsp;</div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string,
    images: PropTypes.array
};

import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import PropTypes from 'prop-types';

export default class GalleryComponent extends Component {
    render() {
        const { imageArray } = this.props;
        return (
            <div className="gallery">
                <div>
                    <Gallery images={imageArray}/>
                </div>
            </div>
        );
    }
}

GalleryComponent.propTypes = {
    imageArray: PropTypes.array
};
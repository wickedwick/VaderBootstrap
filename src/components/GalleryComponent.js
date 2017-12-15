import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import PropTypes from 'prop-types';

export default class GalleryComponent extends Component {
    render() {
        const { imageArray, title } = this.props;
        return (
            <div className="gallery">
                <div>
                    <h2>Gallery components are included.</h2>
                    <Gallery title={title} images={imageArray}/>
                </div>
            </div>
        );
    }
}

GalleryComponent.propTypes = {
    imageArray: PropTypes.array,
    title: PropTypes.string
};
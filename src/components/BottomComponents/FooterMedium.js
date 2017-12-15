import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FooterMedium extends Component {
    render() {
        const { clientName, mediaLinks, customHtml } = this.props;

        return (
            <div className="container-fluid footer-extend-to-bottom">
                
            </div>
        );
    }
}

FooterMedium.propTypes = {
    clientName: PropTypes.string,
    mediaLinks: PropTypes.array,
    customHtml: PropTypes.string
}
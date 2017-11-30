import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
    render() {
        const { clientName } = this.props;

        return (
            <div className="container-fluid footer-bar-bottom">
                <div className="col-xs-12 col-md-6">
                    <p>&copy; { clientName ? clientName : 'Travis Wickham' }</p>
                </div>
                <div className="hidden-xs pull-right align-right col-md-6">
                    <p>Right text</p>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {
    clientName: PropTypes.string
};
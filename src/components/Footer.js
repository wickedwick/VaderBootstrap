import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
    render() {
        const { clientName, rightText } = this.props;

        return (
            <div className="container-fluid footer-bar-bottom">
                <div className="col-xs-12 col-md-6">
                    <p>&copy; { clientName ? clientName : 'Travis Wickham' }</p>
                </div>
                {rightText &&
                    <div className="hidden-xs pull-right align-right col-md-6">
                        <p>{rightText}</p>
                    </div>
                }
            </div>
        );
    }
}

Footer.propTypes = {
    clientName: PropTypes.string,
    rightText: PropTypes.string
};
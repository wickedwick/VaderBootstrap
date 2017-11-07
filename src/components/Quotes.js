import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Quotes extends Component {
    render() {
        const { onQuoteClick, onSecretQuoteClick, isAuthenticated, quote, isSecretQuote } = this.props;

        return (
            <div>
                <div className="container-fluid navbar-margin-offset">
                    <div className="jumbotron text-center">
                    <h1>Hello {this.props.user ? this.props.user.unique_name : ''}</h1>
                    <h2>This is a base application with common features</h2>
                    <h3>Your site will be designed and will have content added soon</h3>
                    </div>
                </div>
                <div className="col-sm-3">
                    <button onClick={onQuoteClick} className="btn btn-primary">
                        Get Quote
                    </button>
                </div>

                {isAuthenticated &&
                    <div className="col-sm-3">
                        <button onClick={onSecretQuoteClick} className="btn btn-primary">
                            Get Secret Quote
                        </button>
                    </div>
                }

                <div className="col-sm-6">
                    {quote && !isSecretQuote &&
                        <div>
                            <blockquote>{quote}</blockquote>
                        </div>
                    }

                    {quote && isAuthenticated && isSecretQuote && 
                        <div>
                            <span className="label label-danger">Secret Quote</span>
                            <hr/>
                            <blockquote>{quote}</blockquote>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

Quotes.propTypes = {
    onQuoteClick: PropTypes.func.isRequired,
    onSecretQuoteClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    quote: PropTypes.string,
    isSecretQuote: PropTypes.bool.isRequired
};
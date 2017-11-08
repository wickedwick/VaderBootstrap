import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuote, fetchSecretQuote } from '../actions';
//import Login from '../components/Login';
import NavBar from '../components/NavBar';
import Quotes from '../components/Quotes';
import PropTypes from 'prop-types';

class App extends Component {
    render() {
        const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote, role } = this.props;
        return (
            <div>
                <NavBar isAuthenticated={isAuthenticated}
                        errorMessage={errorMessage}
                        dispatch={dispatch}
                />
                <div className="container-fluid navbar-margin-offset">
                    <Quotes onQuoteClick={() => dispatch(fetchQuote())}
                            onSecretQuoteClick={() => dispatch(fetchSecretQuote())}
                            isAuthenticated={isAuthenticated}
                            quote={quote}
                            isSecretQuote={isSecretQuote}
                            role={role}
                    />
                </div>    
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    isSecretQuote: PropTypes.bool.isRequired,
    role: PropTypes.string
};

function mapStateToProps(state) {
    const { quotes, auth, userInfo } = state;
    const { quote, authenticated } = quotes;
    const { isAuthenticated, errorMessage } = auth;
    const { unique_name, role } = userInfo;

    return {
        quote,
        isSecretQuote: authenticated,
        isAuthenticated,
        errorMessage,
        unique_name,
        role
    };
}

export default connect(mapStateToProps)(App);
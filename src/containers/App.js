import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuote, fetchSecretQuote, checkUserClaims } from '../actions';
//import Login from '../components/Login';
import NavBar from '../components/NavBar';
import Quotes from '../components/Quotes';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import Home from '../components/Home';

class App extends Component {
    render() {
        const { dispatch, quote, isAuthenticated, errorMessage, isSecretQuote, role, username } = this.props;
        dispatch(checkUserClaims());
        return (
            <div>
                <NavBar isAuthenticated={isAuthenticated}
                        errorMessage={errorMessage}
                        dispatch={dispatch}
                />
                <Jumbotron username={username}
                           isAuthenticated={isAuthenticated}
                />
                <div className="container-fluid navbar-margin-offset">
                    <BrowserRouter>
                        <div>
                            <Route exact path="/" component={Home}/>
                            <Route path="/quotes"
                                render={(props) => <Quotes onQuoteClick={() => dispatch(fetchQuote())}
                                    onSecretQuoteClick={() => dispatch(fetchSecretQuote())}
                                    isAuthenticated={isAuthenticated}
                                    quote={quote}
                                    isSecretQuote={isSecretQuote}
                                    role={role}
                                />} 
                            />
                        </div>
                    </BrowserRouter>
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
    username: PropTypes.string,
    role: PropTypes.string
};

function mapStateToProps(state) {
    const { quotes, auth, userInfo } = state;
    const { quote, authenticated } = quotes;
    const { isAuthenticated, errorMessage } = auth;
    const { username, role } = userInfo;

    return {
        quote,
        isSecretQuote: authenticated,
        isAuthenticated,
        errorMessage,
        username,
        role
    };
}

export default connect(mapStateToProps)(App);
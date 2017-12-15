import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuote, fetchSecretQuote, checkUserClaims } from '../actions';
//import Login from '../components/Login';
import NavBar from '../components/TopComponents/NavBar';
import Quotes from '../components/Quotes';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import Home from '../components/Home';
import Admin from '../components/Admin';
import Footer from '../components/BottomComponents/Footer';
import FooterMedium from '../components/BottomComponents/FooterMedium';

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
                            <Route path="/admin"
                                render={(props) => <Admin 
                                    isAuthenticated={isAuthenticated} 
                                    role={role} 
                                    username={username}
                                />}
                            />
                        </div>
                    </BrowserRouter>
                </div> 
                <FooterMedium clientName="Wickham Design & Development" />
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
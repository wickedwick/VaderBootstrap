import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, IndexRoute } from 'react-router';
// import App from './components/app';
import Home from './Quotes';
// import Contact from './components/views/contact';

export default class Routes extends Component {
    render() {
        return (
            <Route path="/" component={Home}>
                <IndexRoute component={Home} />
                <Route path="*" component={Home} />
            </Route>
        );
    }
}

Routes.propTypes = {

};
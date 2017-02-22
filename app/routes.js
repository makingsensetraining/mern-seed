import React from 'react';
import {Route, IndexRoute,Redirect } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import UserPage from './components/users/UsersPage';
import AboutPage from './components/about/AboutPage';
import NotFound from './components/not_found/NotFound';

export default (
    <Route path="/app" component={App}>
        <Redirect from="/" to="/app" />
        <IndexRoute component={HomePage} />
        <Route path="/app/users" component={UserPage} />
        <Route path="/app/about" component={AboutPage} />
        <Route path="*" component={NotFound} />
    </Route>
);

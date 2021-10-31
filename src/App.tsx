import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';

import Login from './components/Login/Login.lazy';
import Register from './components/Register/Register.lazy';
import Home from './components/Home/Home.lazy';
import Profile from './components/Profile/Profile.lazy';

import './App.scss';

const requireLogin = (to, from, next) => {
    next.redirect('/login');
};

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <GuardProvider guards={[requireLogin]} loading={'Loading...'} error={'Not Found'}>
                    <Link to="/register">To Register</Link>
                    <br/>
                    <Link to="/login">To Login</Link>
                    <br/>
                    <Link to="/profile">To Profile</Link>
                    <Switch>
                        <GuardedRoute path="/profile">
                            <Profile />
                        </GuardedRoute >
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </GuardProvider>
            </div>
        );
    }
}

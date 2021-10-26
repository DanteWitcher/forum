import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Login from './components/Login/Login.lazy';
import Register from './components/Register/Register.lazy';
import Home from './components/Home/Home.lazy';

import './App.scss';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Link to="/register">To Register</Link>
                <br/>
                <Link to="/login">To Login</Link>
                <Switch>
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
            </div>
        );
    }
}

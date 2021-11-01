import React, { Component } from 'react';
import AuthService from '../../core/AuthService';
import AuthForm from '../shared/AuthForm/AuthForm';

import './Login.scss';

export default class Login extends Component {
    login = (email: string, password: string) => {
        AuthService.login(email, password);
    }

    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <AuthForm isRequesting={false} onChange={this.login}></AuthForm>
            </div>
        );
    }
};
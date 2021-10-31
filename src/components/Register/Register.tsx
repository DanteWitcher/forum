import React, { Component } from 'react';
import AuthService from '../../core/AuthService';
import AuthForm from '../shared/AuthForm/AuthForm';

import './Register.scss';

export default class Register extends Component {
    register = (email: string, password: string) => {
        AuthService.register(email, password);
    }

    render() {
        return (
            <div className="register">
                <h1>Register</h1>
                <AuthForm onChange={this.register}></AuthForm>
            </div>
        );
    }
};

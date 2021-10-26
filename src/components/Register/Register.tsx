import React, { BaseSyntheticEvent, Component } from 'react';
import { Box, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';

import './Register.scss';
import AuthService from '../../core/AuthService';

interface IRegisterProps {}

interface IFormErrors {
    email: string,
    password: string,
}

interface IRegisterState {
    email: string,
    password: string,
    formErrors: IFormErrors,
    emailValid: boolean,
    passwordValid: boolean,
    formValid: boolean,
}

const REGEX = {
    email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
    password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/,
}

export default class Register extends Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    private validateForm(name: string, value: string) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        const errorEmailMessage = 'Email is not correct';
        const errorPasswordMessage = 'Password must be eight characters including one uppercase letter, one special character and alphanumeric characters';

        switch (name) {
            case 'email':
                emailValid = !!value.match(REGEX.email);
                fieldValidationErrors.email = emailValid ? '' : errorEmailMessage;
                break;

            case 'password':
                passwordValid = !!value/* || !!value.match(REGEX.password)*/;
                fieldValidationErrors.password = passwordValid ? '' : errorPasswordMessage;
                break;
        
            default:
                break;
        }

        const state = {
            ...this.state,
            formErrors: fieldValidationErrors,
            emailValid,
            passwordValid,
            formValid: emailValid && passwordValid
        };

        this.setState(state);
    }

    onChangeControl(e: BaseSyntheticEvent) {
        console.log('onChangeLogin');

        const name = e.target.name;
        const value = e.target.value;
        const state = { ...this.state, [name]: value }; 
    
        this.setState(state, () => this.validateForm(name, value));
    }

    submit(e: BaseSyntheticEvent) {
        e.preventDefault();

        // if (!this.state.formValid) {
        //     return;
        // }

        AuthService.register(this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="register">
                <h1>Register</h1>
                <Box
                    className="register-form"
                    component="form"
                    noValidate
                    onSubmit={this.submit.bind(this)}
                    autoComplete="off">
                        <div className="register-control">
                            <FormControl>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <OutlinedInput
                                    label="email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChangeControl.bind(this)}
                                />
                            </FormControl>
                        </div>
                        <div className="register-control">
                            <FormControl>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    label="password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangeControl.bind(this)}
                                />
                            </FormControl>
                        </div>
                    <Button variant="contained" type="submit">Send</Button>

                    <div className="validator">
                        email: <strong>{this.state.email || 'empty'}</strong>,
                        <br/>
                        password: <strong>{this.state.password || 'empty'}</strong>,
                        <br/>
                        formErrors[email]: <strong>{this.state.formErrors.email || 'empty'}</strong>,
                        <br/>
                        formErrors[password]: <strong>{this.state.formErrors.password || 'empty'}</strong>,
                        <br/>
                        emailValid: <strong>{this.state.emailValid ? 'true' : 'false'}</strong>,
                        <br/>
                        passwordValid: <strong>{this.state.passwordValid ? 'true' : 'false'}</strong>,
                        <br/>
                        formValid: <strong>{this.state.formValid ? 'true' : 'false'}</strong>
                    </div>
                </Box>
            </div>
        );
    }
};

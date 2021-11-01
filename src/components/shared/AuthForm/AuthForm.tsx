import React, { BaseSyntheticEvent, Component } from 'react';
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

import './AuthForm.scss';

interface IAuthProps {
    onChange: (email, password) => void,
	isRequesting: boolean,
}

interface IFormErrors {
    email: string,
    password: string,
}

interface IAuthState {
    email: string,
    password: string,
    formErrors: IFormErrors,
    emailValid: boolean,
    passwordValid: boolean,
    formValid: boolean,
}

const REGEX = {
    email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
}

export default class AuthForm extends Component<IAuthProps, IAuthState> {
    constructor(props: IAuthProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: null,
            passwordValid: null,
            formValid: false,
        };
    }

    private validateForm(name: string, value: string) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        const errorEmailMessage = 'Email is not correct';
        const errorPasswordMessage = 'Password must be eight characters including one uppercase letter, one special character and alphanumeric characters';

        switch (name) {
            case 'email':
                emailValid = REGEX.email.test(value);
                fieldValidationErrors.email = emailValid ? '' : errorEmailMessage;
                break;

            case 'password':
                passwordValid = REGEX.password.test(value);
                fieldValidationErrors.password = passwordValid ? '' : errorPasswordMessage;
                break;
        
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            emailValid,
            passwordValid,
            formValid: emailValid && passwordValid
        });
    }

    onChangeControl(e: BaseSyntheticEvent) {
        const name = e.target.name;
        const value = e.target.value;
    
        this.setState({ [name]: value } as any, () => this.validateForm(name, value));
    }

    submit(e: BaseSyntheticEvent) {
        e.preventDefault();

        if (!this.state.formValid) {
            return;
        }

        this.props.onChange(this.state.email, this.state.password);
    }

    render() {
        return (
            <Box
                className="auth-form"
                component="form"
                noValidate
                onSubmit={this.submit.bind(this)}
                autoComplete="off">
                    <div className="auth-form-control">
                        <FormControl error={this.state.emailValid === false}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                label="email"
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChangeControl.bind(this)}
								aria-describedby="email-error-text"
								autoComplete="email"
                            />
							<FormHelperText id="password-error-text">{this.state.formErrors.email}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className="auth-form-control">
                        <FormControl error={this.state.passwordValid === false}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                label="password"
                                name="password"
                                type="password"
                                value={this.state.password}
    			                onChange={this.onChangeControl.bind(this)}
								aria-describedby="password-error-text"
  								autoComplete="current-password"
                            />
							<FormHelperText id="password-error-text">{this.state.formErrors.password}</FormHelperText>
                        </FormControl>
                    </div>
                <Button disabled={!this.state.formValid || this.props.isRequesting} variant="contained" type="submit">
					{this.props.isRequesting && <CircularProgress className="circular" size={20}/>}
					Send
				</Button>

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
        );
    }
};

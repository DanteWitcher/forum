import React, { Component } from 'react';
import { finalize, Subject, switchMap, takeUntil } from 'rxjs';
import AuthService from '../../core/services/AuthService';
import AuthForm from '../shared/AuthForm/AuthForm';

import './Register.scss';

interface IRegisterProps {}
interface IRegisterState {
	isRequesting: boolean,
}

export default class Register extends Component<IRegisterProps, IRegisterState> {
	destroy$: Subject<void> = new Subject();

	constructor(props: IRegisterProps) {
		super(props);
		this.state = {
			isRequesting: false,
		};
	}

	componentWillUnmount() {
		this.destroy$.next();
	}

    register = (email: string, password: string) => {
		this.setState({ isRequesting: true });

        AuthService.register(email, password).pipe(
            switchMap(() => AuthService.login(email, password)),
			finalize(() => this.setState({ isRequesting: false })),
			takeUntil(this.destroy$),
		).subscribe(() => {
			console.log('registered....');
		});
    }

    render() {
        return (
            <div className="register">
                <h1>Register</h1>
                <AuthForm isRequesting={this.state.isRequesting} onChange={this.register}></AuthForm>
            </div>
        );
    }
};

import React, { Component } from 'react';
import { finalize, Subject, switchMap, takeUntil } from 'rxjs';
import AuthService from '../../core/AuthService';
import AuthForm from '../shared/AuthForm/AuthForm';

import './Login.scss';

interface ILoginProps {}
interface ILoginState {
	isRequesting: boolean,
}


export default class Login extends Component<ILoginProps, ILoginState> {
    destroy$: Subject<void> = new Subject();

	constructor(props: ILoginProps) {
		super(props);
		this.state = {
			isRequesting: false,
		};
	}

    componentWillUnmount() {
		this.destroy$.next();
	}

    login = (email: string, password: string) => {
		this.setState({ isRequesting: true });

        AuthService.login(email, password).pipe(
            switchMap(() => AuthService.login(email, password)),
			finalize(() => this.setState({ isRequesting: false })),
			takeUntil(this.destroy$),
		).subscribe(() => {
			console.log('login....');
		});
    }

    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <AuthForm isRequesting={this.state.isRequesting} onChange={this.login}></AuthForm>
            </div>
        );
    }
};
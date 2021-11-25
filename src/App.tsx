import React, { Component } from 'react';
import { Switch, Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { GuardedRoute, GuardProvider, Next } from 'react-router-guards';
import { 
	combineLatest, 
	distinctUntilChanged,
	Observable,
	Subject,
	takeUntil,
	tap,
 } from 'rxjs';
import { connect } from 'react-redux';
import { Button } from '@mui/material';

import Login from './components/Login/Login.lazy';
import Register from './components/Register/Register.lazy';
import Home from './components/Home/Home.lazy';
import Profile from './components/Profile/Profile.lazy';

import AuthService from './core/services/AuthService';
import { EProfileType } from './core/redux/types/profile.enum';

import './App.scss';
import { Action, Dispatch } from '@reduxjs/toolkit';

interface IAppState {
	isLogged: boolean,
}

interface IAppProps extends RouteComponentProps {
	fetchProfile: Function, 
}

class App extends Component<IAppProps, IAppState> {
	destroy$: Subject<void> = new Subject();

	constructor(props) {
		super(props);

		this.state = {
			isLogged: null,
		};

		this.logOut = this.logOut.bind(this);
	}

	appGuard = (to, from, next: Next) => {
		console.log('App guard...');

		const isLogged = AuthService.isLogin$.getValue();

		if (['/login', '/register'].includes(to.match.path)) {
			if (isLogged) {
				return next.redirect('/');
			}

			if (!isLogged) {
				return next();
			}
		}

		if (!isLogged) {
			return next.redirect(from.match.path);
		}

		return next();
	};

	isLoginPipe$(): Observable<boolean> {
		return AuthService.isLogin$.pipe(
			distinctUntilChanged(),
			tap((isLogged: boolean) => {
				if (isLogged) {
					this.props.fetchProfile(this.props.history);
				}

				this.setState({ isLogged });
			}),
		);
	}

	componentDidMount() {
        combineLatest([
            AuthService.checkToken(),
			this.isLoginPipe$(),
        ]).pipe(
            takeUntil(this.destroy$),
        ).subscribe();
	}

	componentWillUnmount() {
		this.destroy$.next();
	}

	logOut() {
		AuthService.logOut();
		this.props.history.push('/');
	}

    render() {
        return (
            <div className="app">
                <GuardProvider guards={[this.appGuard]} loading={'Loading...'} error={'Not Found'}>
					<div>
						{!this.state.isLogged && <Link to="/register">To Register<br/></Link>}
						{this.state.isLogged && <Link to="/profile">To Profile<br/></Link>}
						{<Link to="/">To Home<br/></Link>}
						{!this.state.isLogged ? (<Link to="/login">To Login</Link>) : (<Button onClick={this.logOut}>LogOut</Button>)}
						<br/>
					</div>
                    <Switch>
                        <GuardedRoute path="/profile">
                            <Profile />
                        </GuardedRoute >
                        <GuardedRoute path="/login">
                            <Login />
                        </GuardedRoute>
                        <GuardedRoute path="/register">
                            <Register />
                        </GuardedRoute>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </GuardProvider>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => { 
	return {
		fetchProfile: (history: History) => {
			const value = dispatch({ type: EProfileType.FETCH_PROFILE, payload: { history } });
			return value;
		},
	}
};

export default connect(null, mapDispatchToProps)(withRouter(App));

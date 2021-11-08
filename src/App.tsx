import React, { Component } from 'react';
import { Switch, Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import { combineLatest, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';

import Login from './components/Login/Login.lazy';
import Register from './components/Register/Register.lazy';
import Home from './components/Home/Home.lazy';
import Profile from './components/Profile/Profile.lazy';

import AuthService from './core/AuthService';

import './App.scss';

interface IAppState {
	isLogged: boolean,
}

class App extends Component<RouteComponentProps, IAppState> {
	destroy$: Subject<void> = new Subject();

	constructor(props) {
		super(props);
		this.state = {
			isLogged: null,
		};
	}

	appGuard = (to, from, next) => {
		console.log('guard...');

		// if (['/login', '/register'].includes(to.match.path)) {
		// 	if (this.state.isLogged) {
		// 		return next.redirect('/');
		// 	}

		// 	if (!this.state.isLogged) {
		// 		return next();
		// 	}
		// }

		// if (!this.state.isLogged) {
		// 	return next.redirect(from.match.path);
		// }

		return next();
	};

	componentDidMount() {
        combineLatest([
            AuthService.checkToken(),
            AuthService.isLogin$.pipe(
                distinctUntilChanged(),
                tap((value: boolean) => {
                    this.setState({ isLogged: value });
                    this.props.history.push('/');
                })),
        ]).pipe(
            takeUntil(this.destroy$),
        ).subscribe();
	}

	componentWillUnmount() {
		this.destroy$.next();
	}

    render() {
        return (
            <div className="app">
                <GuardProvider guards={[this.appGuard]} loading={'Loading...'} error={'Not Found'}>
                    {!this.state.isLogged && <Link to="/register">To Register<br/></Link>}
                    {!this.state.isLogged && (<Link to="/login">To Login<br/></Link>)}
                    {/*this.state.isLogged && */<Link to="/profile">To Profile<br/></Link>}
                    {<Link to="/">To Home<br/></Link>}
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

export default withRouter(App);

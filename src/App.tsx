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

import Login from './components/Login/Login.lazy';
import Register from './components/Register/Register.lazy';
import Home from './components/Home/Home.lazy';
import Profile from './components/Profile/Profile.lazy';

import AuthService from './core/services/AuthService';
import { EProfileType } from './core/redux/types/profile.enum';
import { actions } from './core/redux/actions/profile.action';

import './App.scss';

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

    render() {
        return (
            <div className="app">
                <GuardProvider guards={[this.appGuard]} loading={'Loading...'} error={'Not Found'}>
                    {!this.state.isLogged && <Link to="/register">To Register<br/></Link>}
                    {!this.state.isLogged && (<Link to="/login">To Login<br/></Link>)}
                    {this.state.isLogged && <Link to="/profile">To Profile<br/></Link>}
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

const mapDispatchToProps = actions[EProfileType.FETCH_PROFILE];

export default connect(null, mapDispatchToProps)(withRouter(App));

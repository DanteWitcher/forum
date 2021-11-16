import React, { Component } from 'react';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import AuthService from '../../core/services/AuthService';
import './Home.scss';

interface IHomeState {
	isLogged: boolean,
}

export default class Home extends Component<null, IHomeState> {
	destroy$: Subject<void> = new Subject();

	constructor(props) {
		super(props);

		this.state = {
			isLogged: null,
		};
	}

	componentDidMount() {
		AuthService.isLogin$.pipe(
			distinctUntilChanged(),
			takeUntil(this.destroy$),
		).subscribe((isLogged: boolean) => {
			this.setState({ isLogged });
		})
	}

	componentWillUnmount() {
		this.destroy$.next();
	}

    render() {
        return (
			<div className="home">
				<h1>Home</h1>
				<img src="https://memegenerator.net/img/instances/64344629.jpg" alt="jhonny" />
				{this.state.isLogged ? <h3>You've done everything, now wait when telephony will be ready</h3> : <h3>Right now, you can login up and create a profile!</h3>}
			</div>
        );
    }
};

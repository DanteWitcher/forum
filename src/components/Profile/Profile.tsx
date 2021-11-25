import { Action, Dispatch } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { GuardedRoute, GuardProvider, Next } from 'react-router-guards';
import { defer, of, Subject, takeUntil } from 'rxjs';
import { EProfileType } from '../../core/redux/types/profile.enum';

import FilesService from '../../core/services/FilesService';
import { IProfile } from '../../shared/interfaces/profile.interface';
import { IState } from '../../shared/interfaces/state.interface';
import ProfileAdd from '../ProfileAdd/ProfileAdd';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import ProfileView from '../ProfileView/ProfileView';

import './Profile.scss';


export interface IProfileProps extends RouteComponentProps {
	profile: IProfile,
	createProfile: Function,
	editProfile: Function,
}

interface IProfileState {}

class Profile extends Component<IProfileProps, IProfileState> {
    destroy$: Subject<void> = new Subject();

    toEditProfile = () => {
		this.props.history.push('/profile/edit');
    }

	profileGuard = (to, from, next: Next) => {
		console.log('Profile guard...');

		if (to.match.path === '/profile/create' && this.props.profile) {
			return next.redirect(from.match.path);
		}

		return next();
	};

	editProfile = (file, profileForm) => {
		return defer(() => Boolean(file) ? FilesService.uploadFile(file) : of(this.props.profile.photoUrl)).pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(resp: any) => {
			    return this.props.editProfile(
			        this.props.history, { ...profileForm, photoUrl: resp?.data?.data || resp },
			    );
			},
		);
	}

	createProfile = (file, profileForm) => {
		return FilesService.uploadFile(file).pipe(
			takeUntil(this.destroy$),
		).subscribe(
			(resp: any) => this.props.createProfile(
				this.props.history,
				{ ...profileForm, photoUrl: resp.data.data },
			),
		);
	}

    render() {
        return (
			<div className="profile">
            	<h1>Profile</h1>
				<GuardProvider guards={[this.profileGuard]}>
                    {this.props.profile ? <Link to="/profile/edit">To Edit</Link> : <Link to="/profile/create">To Add</Link>}
					<br/>
					<Switch>
						<GuardedRoute path="/profile/edit">
							<ProfileEdit profile={this.props.profile} onSubmit={this.editProfile}></ProfileEdit>
						</GuardedRoute>
						<GuardedRoute path="/profile/create">
							<ProfileAdd onSubmit={this.createProfile}></ProfileAdd>
						</GuardedRoute>
						<Route path="/profile/">
							{this.props.profile ? <ProfileView profile={this.props.profile} onEdit={this.toEditProfile}></ProfileView> : <h3>You haven't had profile yet</h3>}
						</Route>
					</Switch>
				</GuardProvider>
			</div>
        );
    }
};

const mapStateToProps = ({ profile }: IState) => {
	return {
		profile: profile.myProfile,
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => { 
	return {
		createProfile: (history: History, data: any) => {
			const value = dispatch({ type: EProfileType.CREATE_PROFILE, payload: { history, data } });
			return value;
		},
		editProfile: (history: History, data: any) => {
			const value = dispatch({ type: EProfileType.EDIT_PROFILE, payload: { history, data } });
			return value;
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));

import { Action, Dispatch } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EProfileType } from '../../core/redux/types/profile.enum';
import { IProfile } from '../../shared/interfaces/profile.interface';
import { IState } from '../../shared/interfaces/state.interface';

import './Profiles.scss';

interface IProfilesProps {
	profile: IProfile,
	profiles: IProfile[],
	getProfiles: Function,
}

interface IProfilesState {}

class Profiles extends Component<IProfilesProps, IProfilesState> {
	componentDidMount() {
		console.log('Profiles component did mount');

		this.props.getProfiles();
	}

	componentWillUnmount() {
		console.log('Profiles component did unmount');
	}

    render() {
		if (!this.props.profiles.length) {
			return (
				<div>Loading...</div>
			);
		}

		const profiles = this.props.profiles.filter((p) => p.id === this.props.profile.id);
		const liItems = profiles.map((p) => {
			const li = 
			(<li className="profiles__nick-name" key={p.id}>
				<strong><div>{p.nickName}</div></strong>
				<div>{p.email}</div>
			</li>);

			return li;
		});

		return (
			<div className="profiles">
				{liItems}
			</div>
		)
	}
};

const mapStateToProps = ({ profile }: IState) => {
	return {
		profile: profile.myProfile,
		profiles: profile.profiles,
	};
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => { 
	return {
		getProfiles: (history: History, data: any) => {
			const value = dispatch({ type: EProfileType.FETCH_PROFILES, payload: { data } });
			return value;
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);

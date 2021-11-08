import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import ProfileAdd from '../ProfileAdd/ProfileAdd';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import ProfileView from '../ProfileView/ProfileView';
import './Profile.scss';

interface IProfileProps {}

interface IProfileState {
    email: string;
    nickName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    role: string;
    phone: string;
    createDateTime: string;
    lastChangedDateTime: string;
    photoUrl: string;
}

export default class Profile extends Component<IProfileProps, IProfileState> {
    constructor(props: IProfileProps) {
        super(props);

        this.state = {
            photoUrl: 'https://klike.net/uploads/posts/2019-03/1551513992_3.jpg',
            email: 'kakhanovich@email.com',
            nickName: 'DanteWitcher',
            firstName: 'Александр',
            middleName: 'Иванович',
            lastName: 'Каханович',
            role: 'ADMIN',
            phone: '+375292595376',
            createDateTime: new Date().toString(),
            lastChangedDateTime: new Date().toString(),
        };

        this.editProfile = this.editProfile.bind(this);
    }

    editProfile($event) {
        $event.preventDefault();

        console.log('edit');
    }

	profileGuard = (to, from, next) => {
		console.log('Profile guard...');

		return next();
	};

    render() {
        return (
			<div className="profile">
            	<h1>Profile</h1>
				<GuardProvider guards={[this.profileGuard]}>
					{<Link to="/profile/edit">To Edit<br/></Link>}
                    {<Link to="/profile/add">To Add<br/></Link>}

					<Switch>
						<GuardedRoute path="/profile/edit">
							<ProfileEdit></ProfileEdit>
						</GuardedRoute>
						<GuardedRoute path="/profile/add">
							<ProfileAdd></ProfileAdd>
						</GuardedRoute>
						<ProfileView></ProfileView>
					</Switch>	
				</GuardProvider>
			</div>
        );
    }
};

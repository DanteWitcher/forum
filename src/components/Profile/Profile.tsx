import React, { Component } from 'react';
import { Link, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import { Subject, switchMap, takeUntil } from 'rxjs';
import FilesService from '../../core/FilesService';
import ProfileService from '../../core/ProfileService';
import ProfileAdd from '../ProfileAdd/ProfileAdd';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import ProfileView from '../ProfileView/ProfileView';
import './Profile.scss';

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

class Profile extends Component<RouteComponentProps, IProfileState> {
    destroy$: Subject<void> = new Subject();
	
	constructor(props: RouteComponentProps) {
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
    }

    toEditProfile = () => {
		this.props.history.push('/profile/edit');
    }

	profileGuard = (to, from, next) => {
		console.log('Profile guard...');

		return next();
	};

	editProfile = (file, profileForm) => {
		return FilesService.uploadFile(file).pipe(
			switchMap((resp: any) => ProfileService.editProfile({ ...profileForm, photoUrl: resp.data.data })),
			takeUntil(this.destroy$),
		).subscribe(() => {
			console.log('Added....');
			this.props.history.push('/');
		});
	}

	createProfile = (file, profileForm) => {
		return FilesService.uploadFile(file).pipe(
			switchMap((resp: any) => ProfileService.createProfile({ ...profileForm, photoUrl: resp.data.data })),
			takeUntil(this.destroy$),
		).subscribe(() => {
			console.log('Added....');
			this.props.history.push('/');
		});
	}

    render() {
        return (
			<div className="profile">
            	<h1>Profile</h1>
				<GuardProvider guards={[this.profileGuard]}>
					{<Link to="/profile/edit">To Edit<br/></Link>}
                    {<Link to="/profile/add">To Add<br/></Link>}

					<Switch>
						<GuardedRoute path="/profile/edit">
							<ProfileEdit onSubmit={this.editProfile}></ProfileEdit>
						</GuardedRoute>
						<GuardedRoute path="/profile/add">
							<ProfileAdd onSubmit={this.createProfile}></ProfileAdd>
						</GuardedRoute>
						<ProfileView onEdit={this.toEditProfile}></ProfileView>
					</Switch>	
				</GuardProvider>
			</div>
        );
    }
};

export default withRouter(Profile);

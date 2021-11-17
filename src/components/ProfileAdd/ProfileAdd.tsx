import React, { Component } from 'react';
import ProfileForm, { IProfileFormState } from '../shared/ProfileForm/ProfileForm';
import './ProfileAdd.scss';

interface IProfileAddProps {
    onSubmit: (form: any, profileForm: any) => void;
}

interface IProfileAddState {}

export default class ProfileAdd extends Component<IProfileAddProps, IProfileAddState> {
	constructor(props: IProfileAddProps) {
        super(props);

        this.state = {};
    }

    addProfile = (form: IProfileFormState) => {
        console.log('adding');
		
		const {
			photo,
			...profileForm
		} = form;

		this.props.onSubmit(form.photo.file, profileForm);
    }

    render() {
        return (
            <div className="profile-edit">
                <h1>Profile Add</h1>
                <ProfileForm onSubmit={this.addProfile}  profile={{
					
				}}></ProfileForm>
            </div>
        );
    }
};

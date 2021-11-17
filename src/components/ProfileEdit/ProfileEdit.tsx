import React, { Component } from 'react';
import { IProfile } from '../../shared/interfaces/profile.interface';
import ProfileForm, { IProfileFormState } from '../shared/ProfileForm/ProfileForm';
import './ProfileEdit.scss';

interface IProfileEditProps {
    onSubmit: (form: any, profileForm: any) => void;
	profile: IProfile;
}

interface IProfileEditState {}

class ProfileEdit extends Component<IProfileEditProps, IProfileEditState> {
    constructor(props: IProfileEditProps) {
        super(props);

        this.editProfile = this.editProfile.bind(this);
    }

    editProfile = (form: IProfileFormState) => {
        console.log('editing');

		const {
			photo,
			...profileForm
		} = form;

		this.props.onSubmit(form.photo.file, profileForm);
    }

    render() {
        return (
            <div className="profile-edit">
                <h1>Profile Edit</h1>
				<ProfileForm onSubmit={this.editProfile} profile={this.props.profile}></ProfileForm>
            </div>
        );
    }
};

export default ProfileEdit;
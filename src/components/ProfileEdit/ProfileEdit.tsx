import React, { Component } from 'react';
import ProfileForm, { IProfileFormState } from '../shared/ProfileForm/ProfileForm';
import './ProfileEdit.scss';

interface IProfileEditProps {}

interface IProfileEditState {
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

export default class ProfileEdit extends Component<IProfileEditProps, IProfileEditState> {
    constructor(props: IProfileEditProps) {
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

    editProfile = (form: IProfileFormState) => {
        console.log('edit', form);
    }

    render() {
        return (
            <div className="profile-edit">
                <h1>Profile Edit</h1>
				<ProfileForm onSubmit={this.editProfile}></ProfileForm>
            </div>
        );
    }
};

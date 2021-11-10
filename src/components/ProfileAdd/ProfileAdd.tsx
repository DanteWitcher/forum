import React, { Component } from 'react';
import ProfileForm, { IProfileForm } from '../shared/ProfileForm/ProfileForm';
import './ProfileAdd.scss';

interface IProfileAddProps {}

interface IProfileAddState {}

export default class ProfileAdd extends Component<IProfileAddProps, IProfileAddState> {
    constructor(props: IProfileAddProps) {
        super(props);

        this.state = {};
    }

    addProfile = (form: IProfileForm) => {
        console.log('add', form);
    }

    render() {
        return (
            <div className="profile-edit">
                <h1>Profile Add</h1>
                <ProfileForm onSubmit={this.addProfile}></ProfileForm>
            </div>
        );
    }
};

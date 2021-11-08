import React, { Component } from 'react';
import ProfileForm from '../ProfileForm/ProfileForm';
import './ProfileAdd.scss';

interface IProfileAddProps {}

interface IProfileAddState {}

export default class ProfileAdd extends Component<IProfileAddProps, IProfileAddState> {
    constructor(props: IProfileAddProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="profile-edit">
                <ProfileForm></ProfileForm>
            </div>
        );
    }
};

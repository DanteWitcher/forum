import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Card, CardContent, CardHeader } from '@mui/material';
import React, { Component } from 'react';

import { IProfile } from '../../shared/interfaces/profile.interface';
import PropertyValue from '../shared/PropertyValue/PropertyValue';
import './ProfileView.scss';

interface IProfileViewProps {
	onEdit: () => void;
	profile: IProfile;
}

interface IProfileViewState {}

class ProfileView extends Component<IProfileViewProps, IProfileViewState> {
    constructor(props: IProfileViewProps) {
        super(props);

        this.editProfile = this.editProfile.bind(this);
    }

    getFullName() {
        return `${this.props.profile.lastName} ${this.props.profile.firstName} ${this.props.profile.middleName}`; 
    }

    editProfile($event) {
        $event.preventDefault();

        this.props.onEdit();
    }

    render() {
        return (
            <div className="profile-view">
                <h1>Profile View</h1>
                <Card variant="outlined">
                    <CardHeader
                    	avatar={<Avatar sx={{ width: 60, height: 60 }} src={this.props.profile.photoUrl.replace('?dl=0', '?raw=1')} aria-label="recipe"></Avatar>}
                    	action={<Button onClick={this.editProfile}><EditIcon/></Button>}/>
                    <CardContent>
                        <PropertyValue property='email' value={this.props.profile.email} showDivider={true}></PropertyValue>
                        <PropertyValue property='role' value={this.props.profile.role} showDivider={true}></PropertyValue>
                        <PropertyValue property='nickName' value={this.props.profile.nickName} showDivider={true}></PropertyValue>
                        <PropertyValue property='fullName' value={this.getFullName()} showDivider={true}></PropertyValue>
                        <PropertyValue property='phone' value={this.props.profile.phone} showDivider={true}></PropertyValue>
                        <PropertyValue property='createDateTime' value={this.props.profile.createDateTime} showDivider={true}></PropertyValue>
                        <PropertyValue property='fullName' value={this.props.profile.lastChangedDateTime} showDivider={true}></PropertyValue>
                    </CardContent>
                </Card>
            </div>
        );
    }
};

export default ProfileView;

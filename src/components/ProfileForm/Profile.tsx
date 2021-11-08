import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Card, CardContent, CardHeader } from '@mui/material';
import React, { Component } from 'react';
import PropertyValue from '../shared/PropertyValue/PropertyValue';
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

    getFullName() {
        return `${this.state.lastName} ${this.state.firstName} ${this.state.middleName}`; 
    }

    editProfile($event) {
        $event.preventDefault();

        console.log('edit');
    }

    render() {
        return (
            <div className="profile">
                <h1>Profile</h1>
                <Card variant="outlined">
                    <CardHeader
                    avatar={<Avatar sx={{ width: 60, height: 60 }} src={this.state.photoUrl} aria-label="recipe"></Avatar>}
                    action={<EditIcon onClick={this.editProfile}/>}/>
                    <CardContent>
                        <PropertyValue property='email' value={this.state.email} showDivider={true}></PropertyValue>
                        <PropertyValue property='role' value={this.state.role} showDivider={true}></PropertyValue>
                        <PropertyValue property='nickName' value={this.state.nickName} showDivider={true}></PropertyValue>
                        <PropertyValue property='fullName' value={this.getFullName()} showDivider={true}></PropertyValue>
                        <PropertyValue property='phone' value={this.state.phone} showDivider={true}></PropertyValue>
                        <PropertyValue property='createDateTime' value={this.state.createDateTime} showDivider={true}></PropertyValue>
                        <PropertyValue property='fullName' value={this.state.lastChangedDateTime} showDivider={true}></PropertyValue>
                    </CardContent>
                </Card>
            </div>
        );
    }
};

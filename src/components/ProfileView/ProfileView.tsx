import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Card, CardContent, CardHeader } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropertyValue from '../shared/PropertyValue/PropertyValue';
import './ProfileView.scss';

interface IProfileViewProps {
	onEdit: () => void;
}

interface IProfileViewState {
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

class ProfileView extends Component<IProfileViewProps, IProfileViewState> {
    constructor(props: IProfileViewProps) {
        super(props);

        this.state = (this.props as any).prof.myProfile;

        this.editProfile = this.editProfile.bind(this);
    }

    getFullName() {
        return `${this.state.lastName} ${this.state.firstName} ${this.state.middleName}`; 
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
                    	avatar={<Avatar sx={{ width: 60, height: 60 }} src={this.state.photoUrl.replace('?dl=0', '?raw=1')} aria-label="recipe"></Avatar>}
                    	action={<Button onClick={this.editProfile}><EditIcon/></Button>}/>
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

const mapStateToProps = (state) => ({
	prof: state.profile,
});

export default connect(mapStateToProps, null)(ProfileView);

import React, { Component } from 'react';
import { Subject, switchMap, takeUntil } from 'rxjs';
import FilesService from '../../core/FilesService';
import ProfileService from '../../core/ProfileService';
import ProfileForm, { IProfileFormState } from '../shared/ProfileForm/ProfileForm';
import './ProfileAdd.scss';

interface IProfileAddProps {}

interface IProfileAddState {}

export default class ProfileAdd extends Component<IProfileAddProps, IProfileAddState> {
    destroy$: Subject<void> = new Subject();
	
	constructor(props: IProfileAddProps) {
        super(props);

        this.state = {};
    }

	componentWillUnmount() {
		this.destroy$.next();
	}

    addProfile = (form: IProfileFormState) => {
		const {
			photo,
			...profileForm
		} = form;

		return FilesService.uploadFile(form.photo.file).pipe(
			switchMap((resp: any) => ProfileService.createProfile({ ...profileForm, photoUrl: resp.data.data })),
			takeUntil(this.destroy$),
		).subscribe(() => {
			console.log('Added....');
		});
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

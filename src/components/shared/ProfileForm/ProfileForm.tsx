import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Avatar, Button, LinearProgress, TextField } from '@mui/material';
import React, { Component } from 'react';

import './ProfileForm.scss';
import { makeAsImg } from '../../../shared/helpers/make-as-img';
import ProfileService from '../../../core/services/ProfileService';
import { debounce, debounceTime, distinctUntilChanged, finalize, Observable, Subject, takeUntil, timer } from 'rxjs';

interface IProfileFormProps {
    onSubmit: (form: IProfileFormState) => void;
	profile: any,
}

export interface IProfileFormState {
	id?: string;
    nickName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
	photo: {
		url: string,
		file: any
	};
}

export default class Profile extends Component<IProfileFormProps, IProfileFormState> {
	destroy$: Subject<void> = new Subject();
	onSearch$ = new Subject();
	onNickNameSubscription$: Observable<any>;

	componentDidMount() {
		this.onNickNameSubscription$ = this.onSearch$.asObservable().pipe(
			debounceTime(1000),
			distinctUntilChanged(),
			finalize(() => setSubmitting(false)),
			takeUntil(this.destroy$),
		).subscribe({
			next: () => {
				console.log('done');
			},
			error: ({ setErrors }) => {
				setErrors({ nickName: 'nickName has already existed' })
			}
		})
	}

	componentDidUpdate() {
		this.destroy$.next();
	}

    constructor(props: IProfileFormProps) {
        super(props);

		const url = makeAsImg(this.props.profile?.photoUrl);

        this.state = {
			id: this.props.profile?.id || '',
            nickName: this.props.profile.nickName || '',
            firstName: this.props.profile.firstName ||'',
            middleName: this.props.profile.middleName || '',
            lastName: this.props.profile.lastName || '',
            phone: this.props.profile.phone || '',
			photo: {
				url: url || '',
				file: null,
			},
        };

        this.submit = this.submit.bind(this);
    }

    submit(form: IProfileFormState) {
		const data = { ...form, photo: this.state.photo };
        this.props.onSubmit(data);
    }

    isNotTouched(touched: {}): boolean {
        return touched && Object.keys(touched).length === 0 && Object.getPrototypeOf(touched) === Object.prototype;
    }

    validationSchema() {
        return Yup.object().shape({
            firstName: Yup.string()
                .trim()
                .min(2, 'First name must be at least 2 characters')
                .max(20, 'First name must not exceed 20 characters'),
            middleName: Yup.string()
                .trim()
                .min(2, 'Middle name must be at least 2 characters')
                .max(20, 'Middle name must not exceed 20 characters'),
            lastName: Yup.string()
                .trim()
                .min(2, 'Last name must be at least 2 characters')
                .max(40, 'Last name must not exceed 40 characters'),
            nickName: Yup.string()
                .trim()
                .required('Field is required')
                .min(2, 'nickName must be at least 2 characters')
                .max(40, 'nickName must not exceed 40 characters'),
            phone: Yup.string()
                .trim()
                .min(2, 'Phone must be at least 2 characters')
                .max(15, 'Phone must not exceed 15 characters'),
            photoUrl: Yup.string().trim(),
        })
    };

    render() {
        return (
            <div className="profile-form">
                <h1>Profile Form</h1>
                
				<Formik
					initialValues={{...this.state}}
					validationSchema={this.validationSchema}
					onSubmit={this.submit}>
					{({ 
                        values: { firstName, lastName, middleName, nickName, phone },
                        submitForm,
                        isSubmitting,
                        isValid,
                        touched, 
                        errors, 
                        handleChange, 
                        setFieldTouched, 
						setSubmitting,
						setErrors,
                    }) => {
                        const change = (name: string, event) => {
                            event.persist();
                            handleChange(event);
                            setFieldTouched(name, true, false);
                        };

						const uploadFile = (name: string, event) => {
							if (event.target.files && event.target.files[0]) {
								this.setState({
									photo: {
										url: URL.createObjectURL(event.target.files[0]),
										file: event.target.files[0],
									},
								});

								change(name, event);
							}
						}

						const changeNickName = (name: string, event) => {
							setSubmitting(true);
							change(name, event);

							this.onSearch$.next({
								value: event.target.value,
								setSubmitting,
								setErrors,
							});

							ProfileService.checkNickName().pipe(
								debounce(() => timer(2000)),
							);
						}


						return (<Form>
                            <div className="profile-form__upload">
                                <input id="photo" type="file" name="photo" onChange={uploadFile.bind(null, 'photo')}/>
                                <Avatar sx={{ width: 60, height: 60 }} src={this.state.photo.url} aria-label="recipe"></Avatar>
                            </div>
                            <div className="profile-form__full-name">
                                <TextField
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    label="LastName"
                                    value={lastName}
                                    helperText={touched.lastName && errors.lastName}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    onChange={change.bind(null, "lastName")}
                                />
                                <TextField
                                    id="firstName"
                                    type="text"
                                    label="FirstName"
                                    name="firstName"
                                    value={firstName}
                                    helperText={touched.firstName && errors.firstName}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    onChange={change.bind(null, "firstName")}
                                />
                                <TextField
                                    id="middleName"
                                    type="text"
                                    label="MiddleName"
                                    name="middleName"
                                    value={middleName}
                                    helperText={touched.middleName && errors.middleName}
                                    error={touched.middleName && Boolean(errors.middleName)}
                                    onChange={change.bind(null, "middleName")}
                                />
                            </div>
                            <div className="profile-form__addition">
                                <TextField
                                    id="nickName"
                                    type="text"
                                    name="nickName"
                                    label="NickName"
                                    value={nickName}
                                    helperText={touched.nickName && errors.nickName}
                                    error={touched.nickName && Boolean(errors.nickName)}
                                    onChange={changeNickName.bind(null, "nickName")}
                                />
                                <TextField
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    label="Phone"
                                    value={phone}
                                    helperText={touched.phone && errors.phone}
                                    error={touched.phone && Boolean(errors.phone)}
                                    onChange={change.bind(null, "phone")}
                                />
                            </div>
                            <div className="profile-form__loading">{isSubmitting && <LinearProgress />}</div>
							<Button
                                type="submit"
								variant="contained"
								color="primary"
								disabled={this.isNotTouched(touched) || !isValid || isSubmitting}
								onClick={submitForm}
							>
								Submit
							</Button>
						</Form>);
                    }}
					</Formik>
            </div>
        );
    }
};

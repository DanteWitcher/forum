import { SimpleFileUpload } from 'formik-mui';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, LinearProgress, OutlinedInput, TextField } from '@mui/material';
import React, { Component } from 'react';
import './ProfileForm.scss';

interface IProfileFormProps {}

interface IProfileFormState {
    nickName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
	photoUrl: string;
}

export default class Profile extends Component<IProfileFormProps, IProfileFormState> {
    constructor(props: IProfileFormProps) {
        super(props);

        this.state = {
            photoUrl: 'https://klike.net/uploads/posts/2019-03/1551513992_3.jpg',
            nickName: 'DanteWitcher',
            firstName: 'Александр',
            middleName: 'Иванович',
            lastName: 'Каханович',
            phone: '+375292595376',
        };

        this.editProfile = this.editProfile.bind(this);
    }

    editProfile($event) {
        $event.preventDefault();

        console.log('edit');
    }

    validationSchema() {
        return Yup.object().shape({
            firstName: Yup.string()
                .min(6, 'First name must be at least 6 characters')
                .max(20, 'First name must not exceed 20 characters'),
            middleName: Yup.string()
                .min(6, 'Middle name must be at least 6 characters')
                .max(20, 'Middle name must not exceed 20 characters'),
            lastName: Yup.string()
                .min(6, 'Last name must be at least 6 characters')
                .max(40, 'Last name must not exceed 40 characters'),
            phone: Yup.string()
                .min(6, 'Phone must be at least 6 characters')
                .max(40, 'Phone must not exceed 40 characters'),
            photoUrl: Yup.string(),
        })
    };

    render() {
        const initialValues = {
            nickName: '',
            firstName: '',
            middleName: '',
            lastName: '',
            phone: '',
            photoUrl: '',
        };

        

        return (
            <div className="profile-form">
                <h1>Profile Form</h1>

				<Formik
					initialValues={initialValues}
					validationSchema={this.validationSchema}
					onSubmit={this.editProfile}
					>
					{({ 
                        values: { firstName, lastName, middleName, nickName, phone, photoUrl },
                        submitForm,
                        isSubmitting, 
                        touched, 
                        errors, 
                        handleChange, 
                        setFieldTouched, 
                    }) => {
                        const change = (name, e) => {
                            e.persist();
                            handleChange(e);
                            setFieldTouched(name, true, false);
                        };

						return (<Form>
							<Field component={SimpleFileUpload} name="file" label="Simple File Upload" />
                            <div className="profile-form__full-name">
                                <TextField
                                    helperText={touched.lastName ? errors.lastName : ""}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    name="lastName"
                                    label="LastName"
                                    type="text"
                                    onChange={change.bind(null, "lastName")}
                                />
                                <TextField
                                    type="text"
                                    label="FirstName"
                                    name="firstName"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-danger"
                                />
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="MiddleName"
                                    name="middleName"
                                />
                            </div>
                            <div className="profile-form__addition">
                                <Field
                                    component={TextField}
                                    name="nickName"
                                    type="text"
                                    label="NickName"
                                />
                                <Field
                                    component={TextField}
                                    name="phone"
                                    type="text"
                                    label="Phone"
                                />
                                {isSubmitting && <LinearProgress />}
                            </div>
                            
							<Button
                                type="submit"
								variant="contained"
								color="primary"
								disabled={isSubmitting}
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

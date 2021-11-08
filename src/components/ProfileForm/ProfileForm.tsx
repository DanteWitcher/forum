import { SimpleFileUpload } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, TextField } from '@mui/material';
import React, { Component } from 'react';
import './ProfileForm.scss';

interface Values {
	email: string;
	password: string;
  }

interface IProfileFormProps {}

interface IProfileFormState {
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

export default class Profile extends Component<IProfileFormProps, IProfileFormState> {
    constructor(props: IProfileFormProps) {
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

    editProfile($event) {
        $event.preventDefault();

        console.log('edit');
    }

    render() {
        return (
            <div className="profile-form">
                <h1>Profile Form</h1>

				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validate={(values) => {
						const errors: Partial<Values> = {};
						if (!values.email) {
						errors.email = 'Required';
						} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
						) {
						errors.email = 'Invalid email address';
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
						setSubmitting(false);
						alert(JSON.stringify(values, null, 2));
						}, 500);
					}}
					>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<Field component={SimpleFileUpload} name="file" label="Simple File Upload" />
							<br/>
							<br/>
							<Field
								component={TextField}
								name="firstName"
								type="email"
								label="Email"
							/>
							<Field
								component={TextField}
								type="password"
								label="Password"
								name="password"
							/>
							<Field
								component={TextField}
								type="password"
								label="Password"
								name="password"
							/>

							{isSubmitting && <LinearProgress />}
							<br />
							<Button
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								onClick={submitForm}
							>
								Submit
							</Button>
						</Form>
					)}
					</Formik>
            </div>
        );
    }
};

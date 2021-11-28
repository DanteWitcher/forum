// TODO: add history to store
import { forkJoin, map, Observable, of, switchMap } from "rxjs";
import { Action } from "@reduxjs/toolkit";
import { ofType, StateObservable } from 'redux-observable';

import ProfileService from "../../services/ProfileService";
import { EProfileType } from "../types/profile.enum";
import { IProfile } from "../../../shared/interfaces/profile.interface";

const fetchProfileEpic = (action$: Observable<Action>, state$: StateObservable<void>): Observable<Action> => {
	return action$.pipe(
		ofType(EProfileType.FETCH_PROFILE),
		switchMap((data) => forkJoin([ProfileService.getProfile(), of((data as any).payload.history)])),
		map(([profile, history]: [IProfile, any]) => {
			if (!profile) {
				// TODO: add guard of profile for create router, I mean this: 
				// if profile exist so you can't got to profile/create
				history.push('/profile/add');
			} else {
				if (['/register', '/login'].includes(history.location.pathname)) {
					history.push('/');
				} else {
					history.goForward();
				}
			}

			return ({ type: EProfileType.PROFILE_FETCHED, payload: profile });
		}),
	);
};

const createProfileEpic = (action$: Observable<Action>) => {
	return action$.pipe(
		ofType(EProfileType.CREATE_PROFILE),
		switchMap((data) => {
			return forkJoin([ProfileService.createProfile((data as any).payload.data), of((data as any).payload.history)]);
		}),
		map(([profile, history]: [any, any]) => {
			history.push('/');

			return ({ type: EProfileType.PROFILE_CREATED, payload: profile?.data });
		}),
	)
}

const editProfileEpic = (action$: Observable<Action>) => {
	return action$.pipe(
		ofType(EProfileType.EDIT_PROFILE),
		switchMap((data) => {
			return forkJoin([ProfileService.editProfile((data as any).payload.data), of((data as any).payload.history)]);
		}),
		map(([profile, history]: [any, any]) => {
			history.push('/');

			return ({ type: EProfileType.PROFILE_UPDATED, payload: profile?.data });
		}),
	)
}

const getProfilesEpic = (action$: Observable<Action>) => {
	return action$.pipe(
		ofType(EProfileType.FETCH_PROFILES),
		switchMap(() => {
			return ProfileService.getProfiles();
		}),
		map((profiles) => {
			console.log(profiles);

			return ({ type: EProfileType.PROFILES_FETCHED, payload: profiles?.data });
		}),
	)
}

export const epics = [
	fetchProfileEpic,
	createProfileEpic,
	editProfileEpic,
	getProfilesEpic,
];

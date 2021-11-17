import { forkJoin, map, Observable, of, switchMap } from "rxjs";
import { Action } from "@reduxjs/toolkit";
import { ofType, StateObservable } from 'redux-observable';

import ProfileService from "../../services/ProfileService";
import { EProfileType } from "../types/profile.enum";
import { IProfile } from "../../../shared/interfaces/profile.interface";

export const fetchProfileEpic = (action$: Observable<Action>, state$: StateObservable<void>): Observable<Action> => {
	return action$.pipe(
		ofType(EProfileType.FETCH_PROFILE),
		switchMap((data) => forkJoin([ProfileService.getProfile(), of((data as any).payload.history)])),
		map(([profile, history]: [IProfile, any]) => {
			if (!profile) {
				// TODO: add guard of profile for create router, I mean this: 
				// if profile exist so you can't got to profile/create
				history.push('/profile/add');
			} else {
				history.push('/');
				//TODO: add state for profile
			}

			return ({ type: EProfileType.PROFILE_FETCHED, payload: profile });
		}),
	);
};

export const epics = [
	fetchProfileEpic,
];

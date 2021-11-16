import { Action, Dispatch } from '@reduxjs/toolkit';
import { EProfileType } from "../types/profile.enum";

export const actions = {
	[EProfileType.FETCH_PROFILE]: (dispatch: Dispatch<Action>) => { 
		return {
			fetchProfile: (history: History) => {
				const value = dispatch({ type: EProfileType.FETCH_PROFILE, payload: { history } });
				return value;
			},
		}
	},
}
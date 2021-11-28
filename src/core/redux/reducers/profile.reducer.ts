import { IProfileState } from '../../../shared/interfaces/state.interface';
import { EProfileType } from '../types/profile.enum';

const initialState: IProfileState = {
	myProfile: null,
	profiles: [],
};

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case EProfileType.PROFILE_FETCHED:
			console.log('PROFILE_FETCHED');
			return { 
				...state,
				myProfile: action.payload,
			};
		case EProfileType.PROFILE_CREATED:
			console.log('PROFILE_CREATED');
			return { 
				...state,
				myProfile: action.payload,
			};
		case EProfileType.PROFILE_UPDATED:
			console.log('PROFILE_UPDATED');
			return { 
				...state,
				myProfile: action.payload,
			};
		case EProfileType.PROFILES_FETCHED:
			console.log('PROFILES_FETCHED');
			return { 
				...state,
				profiles: action.payload,
			};
		default:
			return state;
	}
}
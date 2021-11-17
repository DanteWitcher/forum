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
		default:
			return state;
	}
}
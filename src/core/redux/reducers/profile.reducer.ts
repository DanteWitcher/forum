import { IProfile } from '../../../shared/interfaces/profile.interface';
import { EProfileType } from '../types/profile.enum';

interface IInitialState {
	myProfile: IProfile;
	profiles: IProfile[];
}

const initialState: IInitialState = {
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
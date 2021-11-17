import { IProfile } from "./profile.interface";

export interface IProfileState {
	myProfile: IProfile;
	profiles: IProfile[];
}

export interface IState {
	profile: IProfileState;
}
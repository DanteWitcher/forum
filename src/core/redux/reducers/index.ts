import { combineReducers } from "redux";
import { profileReducer } from "./profile.reducer";

export const rootReducer = combineReducers({
	profile: profileReducer,
});
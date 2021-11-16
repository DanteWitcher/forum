import { combineEpics } from 'redux-observable';
import { epics } from './profile.epic';

export default combineEpics(...epics);
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epics';

import { rootReducer } from './reducers';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
	middleware: [epicMiddleware],
	devTools: true,
  	reducer: rootReducer,
})

epicMiddleware.run(rootEpic);

export default store;
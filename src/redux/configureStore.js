import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './modules/image';
import memberReducer from './modules/member';
import notiReducer from './modules/notification';
import bambooReducer from './modules/bamboo';
import bankReducer from './modules/bank';
import mainReducer from './modules/main';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: {
        member: memberReducer,
        noti: notiReducer,
        bamboo: bambooReducer,
        bank: bankReducer,
        main: mainReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

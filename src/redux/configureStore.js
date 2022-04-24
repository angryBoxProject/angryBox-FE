import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './modules/image';
import memberReducer from './modules/member';
import notiReducer from './modules/notification';
import bambooReducer from './modules/bamboo';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: {
        image: imageReducer,
        member: memberReducer,
        noti: notiReducer,
        bamboo: bambooReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

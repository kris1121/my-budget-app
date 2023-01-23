import { applyMiddleware, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

export const configureStore = preloadedState => {
    const middlewares = {

    }
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];

    const composedEnhancers = composedWithDevTools(...enhancers);
    const store = configureStore(rootReducer, preloadedState, composedEnhancers);

    return store;
}
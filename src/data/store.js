// import { applyMiddleware, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from 'redux-devtools-extension';

import budgetReducer from './reducers/budget.slice';
import commonReducer from './reducers/common.slice'

// export const configureStore = preloadedState => {
//     const middlewares = {

//     }
//     const middlewareEnhancer = applyMiddleware(...middlewares);
//     const enhancers = [middlewareEnhancer];

//     const composedEnhancers = composedWithDevTools(...enhancers);
//     const store = configureStore(rootReducer, preloadedState, composedEnhancers);

//     return store;
// }

export default configureStore({
    reducer: {
        budget: budgetReducer,
        common: commonReducer
    }

})
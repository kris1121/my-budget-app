import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATES } from "data/constants";


export const budgetSlice = createSlice({
    name: "budget",
    initialState: {
        loadingState: {},
        budget: {},
        budgetCategories: []
    },
    reducers: {
        BUDGET_GET_SUCCESS: (state, action) => {

            return {
                ...state,
                loadingState: {},
                budget: action.payload
            }
        },
        BUDGET_GET_REQUEST: (state) => {
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    BUDGET_GET_REQUEST: LOADING_STATES.LOADING
                }
            }
        },
        BUDGET_GET_FAILURE: (state) => {
            return {
                ...state,
                loadingState: {},
                budget: {},
            }
        },
    }
})

export const { BUDGET_GET_SUCCESS, BUDGET_GET_REQUEST, BUDGET_GET_FAILURE } = budgetSlice.actions;

export default budgetSlice.reducer
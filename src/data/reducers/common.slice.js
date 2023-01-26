import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATES } from "data/constants";



export const commonSlice = createSlice({
    name: "common",
    initialState: {
        loadingState: {},
        allCategories: []
    },
    reducers: {
        ALL_CATEGORIES_SUCCESS: (state, action) => {
            return {
                ...state,
                loadingState: {},
                allCategories: action.payload
            }
        },
        ALL_CATEGORIES_REQUEST: (state) => {
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    ALL_CATEGORIES_REQUEST: LOADING_STATES.LOADING
                }
            }
        },
        ALL_CATEGORIES_FAILURE: (state) => {
            return {
                ...state,
                loadingState: {},
                allCategories: [],
            }
        },
    }
})

export const { ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, ALL_CATEGORIES_FAILURE } = commonSlice.actions;

export default commonSlice.reducer
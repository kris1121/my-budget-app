import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATES } from "data/constants";

import { fetchAllCategoriesAction } from "data/actions/common.actions";


export const commonSlice = createSlice({
    name: "common",
    initialState: {
        loadingState: null,
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
    },
    extraReducers: {
        [fetchAllCategoriesAction.pending]: (state) => {
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    ALL_CATEGORIES_REQUEST: LOADING_STATES.LOADING
                }
            }
        },
        [fetchAllCategoriesAction.fulfilled]: (state, { payload }) => {
            let newLoadingState = {
                ...state.loadingState
            }
            delete newLoadingState.ALL_CATEGORIES_REQUEST
            return {
                ...state,
                allCategories: payload,
                loadingState: {
                    ...newLoadingState
                }
            }
        },
        [fetchAllCategoriesAction.rejected]: (state) => {
            return {
                ...state,
                loadingState: LOADING_STATES.FAILED
            }
        },
    }
})

export const { ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, ALL_CATEGORIES_FAILURE } = commonSlice.actions;

export default commonSlice.reducer
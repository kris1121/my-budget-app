import { createSlice } from "@reduxjs/toolkit";

import { LOADING_STATES } from "data/constants";
import { fetchBudgetAction, fetchBudgetedCategoriesAction } from '../actions/budget.actions';


export const budgetSlice = createSlice({
    name: "budget",
    initialState: {
        loadingState: null,
        budget: {},
        budgetCategories: [],
        selectedParentCategoryId: undefined
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
        SET_SELECTED_PARENT_CATEGORY_ID: (state, action) => {
            return {
                ...state,
                selectedParentCategoryId: action.payload
            }
           
        }
    },
    extraReducers: {
        [fetchBudgetAction.pending]: (state) => {

            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    BUDGET_GET_REQUEST: LOADING_STATES.LOADING
                }
           }
        },
        [fetchBudgetAction.fulfilled]: (state, { payload }) => {
            let newLoadingState = {
                ...state.loadingState
            }
            delete newLoadingState.BUDGET_GET_REQUEST
            return {
                ...state,
                budget: payload,
                loadingState: {
                    ...newLoadingState
                }
            }
    
 
        },
        [fetchBudgetAction.rejected]: (state) => {
            return {
                ...state,
                loadingState: LOADING_STATES.FAILED
            }
        },
        [fetchBudgetedCategoriesAction.pending]: (state) => {
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    BUDGET_CATEGORIES_GET_REQUEST: LOADING_STATES.LOADING
                }
            }
        },
        [fetchBudgetedCategoriesAction.fulfilled]: (state, { payload }) => {
            let newLoadingState = {
                ...state.loadingState
            }
            delete newLoadingState.BUDGET_CATEGORIES_GET_REQUEST
            return {
                ...state,
                budgetCategories: payload,
                loadingState: {
                    ...newLoadingState
                }
            }
        },
        [fetchBudgetedCategoriesAction.rejected]: (state) => {
            return {
                ...state,
                loadingState: LOADING_STATES.FAILED,
                budgetCategories: []
            }
        }
    }
})

export const { BUDGET_GET_SUCCESS, BUDGET_GET_REQUEST, BUDGET_GET_FAILURE, SET_SELECTED_PARENT_CATEGORY_ID } = budgetSlice.actions;

export default budgetSlice.reducer
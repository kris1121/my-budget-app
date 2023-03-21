import { createAsyncThunk } from "@reduxjs/toolkit"

import { fetchBudget, fetchBudgetedCategories } from "data/fetch/budget.fetch";

export const fetchBudgetAction = createAsyncThunk("budget/fetchBudget", (id, { dispatch, rejectWithValue}) => {
    try {
        const response = fetchBudget(id)
        return response
    } catch (error) {
        rejectWithValue(error.response)
    }
    
})

export const fetchBudgetedCategoriesAction = createAsyncThunk("budget/fetchBudgetCategories", (id, { dispatch, rejectWithValue }) => {
    try {
        const response = fetchBudgetedCategories(id)
        return response
    } catch (error) {
        rejectWithValue(error.response)
    }
})

import { createAsyncThunk } from "@reduxjs/toolkit"

import { fetchAllCategories } from "data/fetch/common.fetch"

export const fetchAllCategoriesAction = createAsyncThunk("common/fetchAllCategories", (id, { dispatch, rejectWithValue }) => {
    try {
        const response = fetchAllCategories()
        return response
    } catch (error) {
        rejectWithValue(error.response)
    }

})

// export const fetchBudgetedCategoriesAction = createAsyncThunk("budget/fetchBudgetCategories", (id, { dispatch, rejectWithValue }) => {
//     try {
//         const response = fetchBudgetedCategories(id)
//         return response
//     } catch (error) {
//         rejectWithValue(error.response)
//     }
// })
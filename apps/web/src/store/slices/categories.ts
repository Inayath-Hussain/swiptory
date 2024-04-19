import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICategories } from "@src/services/category/getCategories";
import { RootState } from "../index";


interface IState extends ICategories {
    isOptionsFetched: boolean
    isError: boolean
    selectedCategory: string
}

const initialState: IState = {
    categories: [],
    isError: false,
    isOptionsFetched: false,
    selectedCategory: ""
}

const slice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategoryOptions: (state, action: PayloadAction<ICategories>) => {
            state.categories = action.payload.categories
            state.isOptionsFetched = true
            state.isError = false
        },

        addApiError: (state, action: PayloadAction<undefined>) => {
            state.isError = true
            state.isOptionsFetched = false
        },

        updateSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload
        }
    }
})


export const { addCategoryOptions, addApiError, updateSelectedCategory } = slice.actions;

export const categoriesSlice = {
    name: slice.name,
    reducer: slice.reducer
}


export const categoriesSelector = (state: RootState) => state.categories;
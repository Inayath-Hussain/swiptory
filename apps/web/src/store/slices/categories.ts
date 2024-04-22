import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICategories } from "@src/services/category/getCategories";
import { RootState } from "../index";
import { capitalize } from "@src/utilities/capitalize";


type ICategoriesData = ICategories["categories"][number] & {
    displayText: string
}

interface IState {
    categories: ICategoriesData[]
    isOptionsFetched: boolean
    isError: boolean
}

const initialState: IState = {
    categories: [],
    isError: false,
    isOptionsFetched: false
}

const slice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategoryOptions: (state, action: PayloadAction<ICategories>) => {
            // state.categories = action.payload.categories

            const { categories } = action.payload;

            state.categories = categories.map(m => ({ name: m.name, image: m.image, displayText: capitalize(m.name) }))

            state.isOptionsFetched = true
            state.isError = false
        },

        addApiError: (state, action: PayloadAction<undefined>) => {
            state.isError = true
            state.isOptionsFetched = false
        }
    }
})


export const { addCategoryOptions, addApiError } = slice.actions;

export const categoriesSlice = {
    name: slice.name,
    reducer: slice.reducer
}


export const categoriesSelector = (state: RootState) => state.categories;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { createQueryString } from "@src/utilities/createQueryString";


const initialState = {
    options: {
        category: "",
        limit: "4"
    },

    queryString: createQueryString({ limit: "4" })
}

export type IStoriesQueryData = typeof initialState

interface IUpdateStoriesQueryPayload {
    key: keyof typeof initialState.options
    value: string
}


const slice = createSlice({
    name: "storiesQuery",
    initialState,
    reducers: {
        updateStoriesQuery: (state, action: PayloadAction<IUpdateStoriesQueryPayload>) => {
            const { key, value } = action.payload;

            state.options[key] = value;
            state.queryString = createQueryString(state.options);
        }
    }
})



export const { updateStoriesQuery } = slice.actions;

export const storiesQuerySlice = {
    name: slice.name,
    reducer: slice.reducer
}


export const storiesQuerySelector = (state: RootState) => state.storiesQuery;
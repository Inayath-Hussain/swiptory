import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";


const initialState = {
    name: "",
    profilePicUrl: ""
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserName: (state, action: PayloadAction<typeof initialState>) => {
            state.name = action.payload.name
            state.profilePicUrl = action.payload.profilePicUrl
        }
    }
})



export const { updateUserName } = slice.actions

export const userInfoSelector = (state: RootState) => state.user

export const userSlice = {
    name: slice.name,
    reducer: slice.reducer
}
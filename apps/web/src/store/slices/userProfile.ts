import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";


const initialState = {
    username: "",
    profilePicUrl: ""
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserProfile: (state, action: PayloadAction<typeof initialState>) => {
            state.username = action.payload.username
            state.profilePicUrl = action.payload.profilePicUrl
        }
    }
})



export const { updateUserProfile } = slice.actions

export const userProfileSelector = (state: RootState) => state.user

export const userProfileSlice = {
    name: slice.name,
    reducer: slice.reducer
}
import {createSlice} from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        showSpinner: false,
    },
    reducers: {
        changeLoadingStatusByAmount: (state, action) => {
            state.showSpinner = action.payload
        }
    }
})

export const {changeLoadingStatusByAmount} = loadingSlice.actions
export default loadingSlice.reducer
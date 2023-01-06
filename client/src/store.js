import {configureStore} from "@reduxjs/toolkit";
import loadingReducer from './redux/loadingSlice'

export default configureStore({
    reducer: {
        loading: loadingReducer
    }
})
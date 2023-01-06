import {configureStore} from "@reduxjs/toolkit";
import loadingReducer from './redux/loadingSlice'
import counterReducer from './redux/counterSlice'

export default configureStore({
    reducer: {
        loading: loadingReducer,
        counter: counterReducer
    }
})
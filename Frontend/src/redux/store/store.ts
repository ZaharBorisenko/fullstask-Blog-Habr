import {configureStore} from "@reduxjs/toolkit";
import postSlice from "../Slices/postSlice";

const store = configureStore({
    reducer: {
        posts: postSlice,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
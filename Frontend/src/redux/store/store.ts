import {configureStore} from "@reduxjs/toolkit";
import postSlice from "../Slices/postSlice";
import popularityPostSlice from "../Slices/popularityPostSlice";
import onePostSlice from "../Slices/OnePostSlice";

const store = configureStore({
    reducer: {
        posts: postSlice,
        postsPopularity: popularityPostSlice,
        onePost: onePostSlice,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
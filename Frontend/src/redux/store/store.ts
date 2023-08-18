import {configureStore} from "@reduxjs/toolkit";
import postSlice from "../Slices/postSlice";
import popularityPostSlice from "../Slices/popularityPostSlice";
import authSlice from "../Slices/authSlice";
import tagsSlice from "../Slices/TagsSlice";

const store = configureStore({
    reducer: {
        posts: postSlice,
        postsPopularity: popularityPostSlice,
        auth: authSlice,
        tags: tagsSlice,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
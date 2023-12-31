import {configureStore} from "@reduxjs/toolkit";
import postSlice from "../Slices/postSlice";
import popularityPostSlice from "../Slices/popularityPostSlice";
import authSlice from "../Slices/authSlice";
import tagsSlice from "../Slices/TagsSlice";
import sortPost from '../Slices/sortiPost'
import postFavourites from "../Slices/postFavourites";
import commentsSlice from "../Slices/commentsSlice";

const store = configureStore({
    reducer: {
        posts: postSlice,
        postsPopularity: popularityPostSlice,
        auth: authSlice,
        tags: tagsSlice,
        sortPost: sortPost,
        postFavourites: postFavourites,
        comments: commentsSlice,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
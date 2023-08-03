import {createSlice, createAsyncThunk, PayloadAction, Draft} from "@reduxjs/toolkit";
import axios from "axios";

// type array = string[];
//
// type Post = {
//     id: string,
//     title:string,
//     text: string,
//     tags: array,
//     keywords:array,
//     imagePost: string,
//     difficultyLevel: string,
//     viewCount: number,
//     readingTime: number,
//     user: {},
// }
// type postState = {
//     posts: Post[]
//     status: string,
// }
// const initialState: postState = {
//     posts: [],
//     status: ''
// }

const initialState = {
    posts: [],
    status: ''
}

export const fetchPost = createAsyncThunk(
    'posts/fetchPost',
    async () => {
        const {data}  = await axios.get('http://localhost:4000/posts')
        return data
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: ((state,action) => {
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state:Draft<any>) => {
                state.posts = []
                state.status = 'loading';
            })
            .addCase(fetchPost.fulfilled, (state:Draft<any>,action) => {
                state.posts = action.payload
                state.status = 'loaded';
            })
            .addCase(fetchPost.rejected, (state:Draft<any>) => {
                state.posts = []
                state.status = 'error';
            })
    }
})


export default postSlice.reducer;
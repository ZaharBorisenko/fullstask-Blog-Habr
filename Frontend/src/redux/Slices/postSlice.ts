import {createSlice, createAsyncThunk, PayloadAction, Draft} from "@reduxjs/toolkit";
import axios from '../../axios'

export interface IUser {
    avatar: string,
    createdAt?: string;
    email: string;
    nickName: string;
    passwordHash?: string;
    updatedAt?: string;
    __v?: number;
    _id: string;
    firstName?: string,
    lastName?: string,
    aboutMe?: string,
    privateProfile: boolean,
}

export interface PostType {
    createdAt?: string;
    difficultyLevel: string;
    imagePost: string;
    keywords: string[];
    readingTime: number;
    tags: string[];
    text: string;
    title: string;
    updatedAt?: string;
    user: IUser;
    viewCount: number;
    __v?: number;
    _id: string;
}

type postState = {
    posts: PostType[]
    status: string,
    totalPosts: number
    postsUser: PostType[]
}
const initialState: postState = {
    posts: [],
    status: '',
    totalPosts: 1,
    postsUser: [],
}

export const fetchPost = createAsyncThunk<Partial<PostType[]>, { limit: number; page:number }>(
    'posts/fetchPost',
    async ({limit,page}) => {
        const {data}  = await axios.get(`/posts?limit=${limit}&page=${page}`)
        return data
    }
)

export const fetchPostAllUser = createAsyncThunk<Partial<PostType[]>>(
    'posts/fetchPostAllUser',
    async () => {
        const {data}  = await axios.get(`/postsUser`)
        return data
    }
)

export const fetchDeletePost = createAsyncThunk<any>(
    'post/fetchRemovePost',
    async (id) => {
        const { data } = await axios.delete(`/posts/${id}`);
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
            .addCase(fetchPost.pending, (state:Draft<postState>) => {
                state.posts = []
                state.status = 'loading';
            })
            .addCase(fetchPost.fulfilled, (state:Draft<postState>,action:PayloadAction<any>) => {
                state.posts = action.payload.posts;
                state.status = 'loaded';
                state.totalPosts = action.payload.totalPosts;
            })
            .addCase(fetchPost.rejected, (state:Draft<postState>) => {
                state.posts = []
                state.status = 'error';
            })
            .addCase(fetchDeletePost.pending, (state:Draft<postState>,action:PayloadAction<any>) => {
                state.posts = state.posts.filter(post => post._id !== action.meta.arg)
            } )
            .addCase(fetchPostAllUser.fulfilled, (state:Draft<postState>,action:PayloadAction<any>) => {
                state.postsUser = action.payload;
            })
    }
})


export default postSlice.reducer;
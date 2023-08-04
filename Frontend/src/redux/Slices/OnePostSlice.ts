import {createSlice, createAsyncThunk, PayloadAction, Draft} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchPopularity} from "./popularityPostSlice";
interface User {
    avatar: string,
    createdAt?: string;
    email: string;
    nickName: string;
    passwordHash?: string;
    updatedAt?: string;
    __v?: number;
    _id: string;
}

interface PostType {
    createdAt?: string;
    difficultyLevel: string;
    imagePost: string;
    keywords: string[];
    readingTime: number;
    tags: string[];
    text: string;
    title: string;
    updatedAt?: string;
    user: User;
    viewCount: number;
    __v?: number;
    _id: string;
}

type postState = {
    onePost: PostType[]
    onePostStatus: string,

}
const initialState: postState = {
    onePost: [],
    onePostStatus: '',
}

export const fetchOnePost = createAsyncThunk<Partial<PostType[]>>(
    'posts/fetchOnePost',
    async (id) => {
        const {data}  = await axios.get(`http://localhost:4000/posts/${id}`)
        return data
    }
)

const onePostSlice = createSlice({
    name:'onePostSlice',
    initialState,
    reducers: {
        popularityPostSlice: () => {}
    },
    extraReducers: (builder => {
        builder
            .addCase(fetchOnePost.pending, (state:Draft<postState>) => {
                state.onePost = []
                state.onePostStatus = 'loading';
            })
            .addCase(fetchOnePost.fulfilled, (state:Draft<postState>,action:PayloadAction<any>) => {
                state.onePost = action.payload;
                state.onePostStatus = 'loaded';
            })
            .addCase(fetchOnePost.rejected, (state:Draft<postState>) => {
                state.onePost = []
                state.onePostStatus = 'error';
            })
    })
})

export default onePostSlice.reducer
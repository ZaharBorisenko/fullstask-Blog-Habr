import {createSlice, createAsyncThunk, PayloadAction, Draft} from "@reduxjs/toolkit";
import axios from '../../axios'
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
    popularityPosts: PostType[]
    popularityStatus: string,

}
const initialState: postState = {
    popularityPosts: [],
    popularityStatus: '',
}

export const fetchPopularity = createAsyncThunk<Partial<PostType[]>>(
    'posts/fetchPopularity',
    async () => {
        const {data}  = await axios.get('/posts/popularity')
        return data
    }
)

const popularityPostSlice = createSlice({
    name:'postPopularity',
    initialState,
    reducers: {
        popularityPostSlice: () => {}
    },
    extraReducers: (builder => {
        builder
            .addCase(fetchPopularity.pending, (state:Draft<postState>) => {
                state.popularityPosts = []
                state.popularityStatus = 'loading';
            })
            .addCase(fetchPopularity.fulfilled, (state:Draft<postState>,action:PayloadAction<any>) => {
                state.popularityPosts = action.payload;
                state.popularityStatus = 'loaded';
            })
            .addCase(fetchPopularity.rejected, (state:Draft<postState>) => {
                state.popularityPosts = []
                state.popularityStatus = 'error';
            })
    })
})

export default popularityPostSlice.reducer
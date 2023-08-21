import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {PostType} from "./postSlice";
import axios from "../../axios";


type sortPost = {
    sortParams: string
    postsPopularity: PostType[];
    statusPostsPopularity: string;
    totalPopularPosts: number

    postReadingTime: PostType[]
    statusPostsReadingTime: string
}
const initialState: sortPost = {
    postsPopularity: [],
    statusPostsPopularity: '',
    totalPopularPosts: 0,
    sortParams: '',
    postReadingTime: [],
    statusPostsReadingTime: '',
};

export const fetchSortPopularityPost = createAsyncThunk<Partial<PostType[]>,{limit:number, page:number}>(
    'posts/fetchSortPopularityPost',
    async ({limit,page}) => {
        const {data} = await axios.get(`/posts/popularitySort?limit=${limit}&page=${page}`);
        return data
    }
)

export const fetchSortReadingTimePost = createAsyncThunk<Partial<PostType[]>,{limit:number, page:number, sortBy:string}>(
    'posts/fetchSortReadingTimePost',
    async ({limit,page,sortBy}) => {
        const {data} = await axios.get(`/posts/readingTime?sortBy=${sortBy}&limit=${limit}&page=${page}`);
        return data
    }
)


const sortPost = createSlice({
    name: 'sortPost',
    initialState,
    reducers: {
        sortParams: (state:Draft<sortPost>, action:PayloadAction<string>) => {
            state.sortParams = action.payload
        }
    },
    extraReducers: (builder => {
      builder
          .addCase(fetchSortPopularityPost.pending, (state:Draft<sortPost>) => {
              state.statusPostsPopularity = 'loading'
          })
          .addCase(fetchSortPopularityPost.fulfilled, (state:Draft<sortPost>, action:PayloadAction<any>) => {
              state.postsPopularity = action.payload.postsPopularity;
              state.totalPopularPosts = action.payload.totalPopularPosts;
              state.statusPostsPopularity = 'loaded';
          })
          .addCase(fetchSortPopularityPost.rejected, (state:Draft<sortPost>) => {
              state.statusPostsPopularity = 'error'
          })
          .addCase(fetchSortReadingTimePost.pending, (state:Draft<sortPost>) => {
              state.statusPostsReadingTime = 'loading'
          })
          .addCase(fetchSortReadingTimePost.fulfilled, (state:Draft<sortPost>, action:PayloadAction<any>) => {
              state.postReadingTime = action.payload
              state.statusPostsReadingTime = 'loaded'
          })
          .addCase(fetchSortReadingTimePost.rejected, (state:Draft<sortPost>) => {
              state.statusPostsReadingTime = 'error'
          })
    })
})

export const {sortParams} = sortPost.actions;
export default sortPost.reducer
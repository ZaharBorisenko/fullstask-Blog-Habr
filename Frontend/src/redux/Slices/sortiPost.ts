import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {PostType} from "./postSlice";
import axios from "../../axios";


type sortPost = {
    postsPopularity: PostType[];
    statusPostsPopularity: string;
    totalPopularPosts: number
}
const initialState: sortPost = {
    postsPopularity: [],
    statusPostsPopularity: '',
    totalPopularPosts: 0,
};

export const fetchSortPopularityPost = createAsyncThunk<Partial<PostType[]>,{limit:number, page:number}>(
    'posts/fetchSortPopularityPost',
    async ({limit,page}) => {
        const {data} = await axios.get(`/posts/popularitySort?limit=${limit}&page=${page}`);
        return data
    }
)

const sortPost = createSlice({
    name: 'sortPost',
    initialState,
    reducers: {
        sortPost: () => {}
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
    })
})
export default sortPost.reducer
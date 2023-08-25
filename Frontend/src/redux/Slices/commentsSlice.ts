import {IUser} from "./postSlice";
import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IComments {
    _id: any,
    comment: string,
    user: IUser,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}
export interface commentsState {
    comments: IComments[],
    status: string
}

const initialState: commentsState = {
    comments: [],
    status: '',
}

export const fetchComments = createAsyncThunk<Partial<IComments[]>>(
    'comment/fetchComments',
    async (postId) => {
        const {data} = await  axios.get(`/comments/${postId}`)
        return data
    }
)

export const createComment = createAsyncThunk(
    'comments/createComment',
    async ({ id, comment, userId }) => {
        const response = await axios.post(`/createComments/${id}`, { comment, userId });
        return response.data;
    }
);


const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComment : () => {}
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchComments.pending, (state:Draft<commentsState>) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state:Draft<commentsState>,action:PayloadAction<any>) => {
                state.comments = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchComments.rejected, (state:Draft<commentsState>) => {
                state.status = 'rejected';
            })
            .addCase(createComment.fulfilled, (state:Draft<commentsState>, action:PayloadAction<any>) => {
                state.comments.push(action.payload);
            });
    })
})

export default commentSlice.reducer
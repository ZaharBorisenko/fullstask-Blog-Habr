import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";
//@ts-ignore
export interface ITags {
    _id: string,
    count: number,
}

export interface tagsState {
    tags: ITags[];
    status: string,
}

const initialState: tagsState = {
    tags: [],
    status: '',
}

export const fetchAllTags = createAsyncThunk<Partial<ITags[]>>(
    'tags/fetchAllTags',
    async () => {
        const {data} = await axios.get('/allTags')
        return data;
    }
)

const TagsSlice = createSlice({
    name:'tags',
    initialState,
    reducers: {
        setTags: (() => {
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTags.pending, (state:Draft<tagsState>) => {
                state.status = 'loading'
            })
            .addCase(fetchAllTags.fulfilled, (state:Draft<tagsState>,action:PayloadAction<any>) => {
                state.status = 'loaded'
                state.tags = action.payload
            })
            .addCase(fetchAllTags.rejected,(state:Draft<tagsState>) => {
                state.status = 'rejected'
            })
    }
})

export default TagsSlice.reducer
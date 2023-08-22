import {PostType} from "./postSlice";
import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";


type favouritesState = {
    postFavourites:PostType[];
}
const initialState:favouritesState = {
    postFavourites: []
}

const postFavouritesSlice = createSlice({
    name: 'postFavourites',
    initialState,
    reducers: {
        setPostFavourites: (state:Draft<favouritesState>, action:PayloadAction<any>) => {
            state.postFavourites = [...state.postFavourites, action.payload]
        },
        removePostFavourites: (state:Draft<favouritesState>, action:PayloadAction<any>) => {
            state.postFavourites = state.postFavourites.filter(post => post._id !== action.payload._id)
        },
        removeAllPostFavourites: (state:Draft<favouritesState>) => {
            state.postFavourites = []
        }
    }
})

export const {setPostFavourites,removePostFavourites,removeAllPostFavourites} = postFavouritesSlice.actions
export default postFavouritesSlice.reducer;
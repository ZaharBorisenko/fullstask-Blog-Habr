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
        }
    }
})

export const {setPostFavourites} = postFavouritesSlice.actions
export default postFavouritesSlice.reducer;
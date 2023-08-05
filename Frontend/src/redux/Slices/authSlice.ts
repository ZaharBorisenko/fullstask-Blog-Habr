import {createSlice, createAsyncThunk, PayloadAction, Draft, createSelector} from "@reduxjs/toolkit";
import axios from "../../axios";


interface ILoginState {
    data: any
    status: string,
}

const initialState:ILoginState = {
    data: {

    },
    status: ''
}


export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (params) => {
        const {data} = await axios.post('/login', params)
        return data;
    }
)

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (params) => {
        const {data} = await axios.get('/profile')
        return data;
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state:Draft<ILoginState>) => {
            state.data = {};
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(fetchUser.pending, (state:Draft<ILoginState>) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state:Draft<ILoginState>, action:PayloadAction<any>) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchUser.rejected, (state:Draft<ILoginState>) => {
                state.status = 'error'
            })
            .addCase(fetchLogin.pending, (state:Draft<ILoginState>) => {
                state.status = 'loading'
            })
            .addCase(fetchLogin.fulfilled, (state:Draft<ILoginState>, action:PayloadAction<any>) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchLogin.rejected, (state:Draft<ILoginState>) => {
                state.status = 'error'
            })

    })
})

// Добавляем селектор для проверки наличия данных
export const selectIsAuthenticated = createSelector(
    (state) => state.auth.data,
    (data) => !!Object.keys(data).length
);
export const {logOut} = authSlice.actions
export default authSlice.reducer
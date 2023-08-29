import {createSlice, createAsyncThunk, PayloadAction, Draft, createSelector} from "@reduxjs/toolkit";
import axios from "../../axios";
import {IUser} from "./postSlice";
import {AxiosError} from "axios";

//@ts-ignore

interface ILoginState {
    data: any
    status: string,
    error: string
}

export interface IValues {
    email: string,
    password: string,
}

export interface IData extends IUser {
    token: string,
}
const initialState:ILoginState = {
    data: {
    },
    status: '',
    error: ''
}

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (params:IValues, { rejectWithValue }) => {
        try {
            const {data} = await axios.post('/login', params)
            return data;
        } catch (error: unknown) {
            if (error instanceof AxiosError){
                if (error.response && error.response.data && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                }
            }
            return rejectWithValue('Произошла ошибка входа');
        }
    }
);


export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (params:IValues, {rejectWithValue}) => {
        try {
            const {data} = await axios.post('/register',params)
            return data;
        }catch (error: unknown) {
            if (error instanceof AxiosError){
                if (error.response && error.response.data && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                }
            }
            return rejectWithValue('Произошла ошибка регистрации');
        }

    }
)

export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async () => {
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
            .addCase(fetchLogin.pending, (state:Draft<ILoginState>) => {
                state.status = 'loading'
            })
            .addCase(fetchLogin.fulfilled, (state:Draft<ILoginState>, action:PayloadAction<any>) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchLogin.rejected, (state:Draft<ILoginState>,action:PayloadAction<any>) => {
                state.status = 'error'
                state.error = action.payload;
            })
            .addCase(fetchProfile.pending, (state:Draft<ILoginState>) => {
                state.status = 'loading'
            })
            .addCase(fetchProfile.fulfilled, (state:Draft<ILoginState>, action:PayloadAction<any>) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchProfile.rejected, (state:Draft<ILoginState>) => {
                state.status = 'error'
            })
            .addCase(fetchRegister.pending, (state:Draft<ILoginState>) => {
                state.status = 'loading'
            })
            .addCase(fetchRegister.fulfilled, (state:Draft<ILoginState>, action:PayloadAction<any>) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchRegister.rejected, (state:Draft<ILoginState>,action:PayloadAction<any>) => {
                state.status = 'error'
                state.error = action.payload;
            })
    })
})

// Добавляем селектор для проверки наличия данных
export const selectIsAuthenticated = createSelector(
    (state) => state.auth.data as IUser | undefined,
    (data) => !!data && !!Object.keys(data).length
);
export const {logOut} = authSlice.actions
export default authSlice.reducer
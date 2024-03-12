import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './userApi';
import { toast } from 'react-toastify';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    message: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
    },
    //login
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.token = action.payload.data.token;
                localStorage.setItem('accessToken', action.payload.data.token);
                state.loading = false;
                state.error = null;
                state.message = action.payload?.message;
                toast.success(state.message);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload ? action.payload?.message?.toString() : 'Registration failed';
                toast.error(state.message);
            })
            //register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.token = action.payload.data.token;
                localStorage.setItem('accessToken', action.payload.data.token);
                state.loading = false;
                state.error = null;
                state.message = action.payload?.message;
                toast.success(state.message);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload ? action.payload?.message?.toString() : 'Registration failed';
                toast.error(state.message);
            })
    },
});

export const getToken = (state) => state.user.token;
export const getUserDetails = (state) => state.user;

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const loginUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await api.post('user/login', { email, password });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const registerUser = createAsyncThunk('user/register', async ({ username, email, password }, { rejectWithValue }) => {
    try {
        const response = await api.post('user/register', { username, email, password });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
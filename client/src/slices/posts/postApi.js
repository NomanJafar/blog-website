import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ searchTerm, pageSize, page, authorName }, { rejectWithValue }) => {
    try {
        const queryParams = {
            searchTerm,
            pageSize,
            page,
            authorName
        };
        const response = await api.get('/post', { params: queryParams });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchPostbyId = createAsyncThunk('posts/fetchPostbyId', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/post/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createPost = createAsyncThunk('posts/createpost', async ({ title, content }, { rejectWithValue }) => {
    try {
        const response = await api.post(`/post`, { title, content });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchMyPosts = createAsyncThunk('posts/fetchMyPosts', async ({ }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/post/userposts`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/post/${id}`, { title, content });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


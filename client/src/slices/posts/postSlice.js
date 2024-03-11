import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPost, fetchMyPosts, fetchPostbyId, fetchPosts } from './postApi';
import { toast } from 'react-toastify';



const postsSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        totalCount: 0,
        count: 0,
        loading: false,
        error: null,
        message: null,
        currentPost: null
    },
    reducers: {},
    extraReducers: (builder) => {
        //fetchPosts
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.posts = [];
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.data.posts;
                state.totalCount = action.payload.data.totalCount;
                state.count = action.payload.data.count;
                state.message = action.payload?.message;
                toast.success(state.message);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                state.message = action.payload?.message;
                state.posts = [];
                toast.error(state.message);
            });
        //fetchPostbyId
        builder
            .addCase(fetchPostbyId.pending, (state) => {
                state.loading = true;
                state.currentPost = null;
            })
            .addCase(fetchPostbyId.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPost = action.payload.data;
                state.message = action.payload?.message;
                toast.success(state.message);
            })
            .addCase(fetchPostbyId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                state.message = action.payload?.message;
                state.currentPost = null;
                toast.error(state.message);
            });

        //createPost
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.currentPost = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPost = action.payload.data;
                state.message = action.payload?.message;
                toast.success(state.message);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                state.message = action.payload?.message;
                state.currentPost = null;
                toast.error(state.message);
            });

        // fetchMyPosts
        builder
            .addCase(fetchMyPosts.pending, (state) => {
                state.loading = true;
                state.posts = null;
            })
            .addCase(fetchMyPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.data;
                state.message = action.payload?.message;
                toast.success(state.message);
            })
            .addCase(fetchMyPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                state.message = action.payload?.message;
                state.posts = null;
                toast.error(state.message);
            });
    },

});

export const getCurrentPost = (state) => state.post.currentPost;

export default postsSlice.reducer;

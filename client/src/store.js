import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import userReducer from './slices/users/userSlice';
import postReducer from './slices/posts/postSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer
    },
});

export default store;

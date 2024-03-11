import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentPost } from '../slices/posts/postSlice';
import { fetchPostbyId } from '../slices/posts/postApi';
import formattedDate from './Date';
import parse from 'html-react-parser';
const PostDetails = ({ match }) => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(getCurrentPost);


    useEffect(() => {
        dispatch(fetchPostbyId({ id: postId }));
    }, []);
    return (
        <div className="flex w-full flex-auto m-4">
            <AuthorInfo author={post?.author} />
            <Post post={post} />
        </div>
    );
};

export default PostDetails;


const Post = ({ post }) => {
    return (
        <div className="post bg-white m-10 p-8 shadow-md rounded-md w-full">
            <h2 className="text-2xl font-bold mb-4">{post?.title}</h2>
            <p className="text-sm mb-4">{formattedDate(post?.created)}</p>
            <div className="text-gray-800">{post?.content ? parse(post?.content) : 'loading'}</div>
        </div>
    );
};




const AuthorInfo = ({ author }) => {
    return (
        <div className="author-info bg-gray-100  p-4 border rounded border-gray-300 mt-4 mr-4">
            <p className="text-gray-700">Author: {author?.username}</p>
        </div>
    );
};




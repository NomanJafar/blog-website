import React, { useEffect } from 'react'
import { fetchMyPosts } from '../slices/posts/postApi';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';

const MyPosts = () => {
    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.post.posts ?? []);


    useEffect(() => {
        dispatch(fetchMyPosts({}));
    }, []);
    return (
        <div className="container mx-auto mt-8">
            <Toast />
            <div className='flex flex-1 flex-end my-10 mx-20'>
                <Link to='/createpost'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create a Post
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {postsData.map(post => (
                    <PostCard key={post.id} post={post} isEdit={true} />
                ))}
            </div>
        </div >
    );
}

export default MyPosts

import React from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';

const PostCard = ({ post, isEdit }) => {
    return (
        <Link to={`/postdetails/${post.id}`}>
            <div key={post.id} className="border p-4 relative">
                {isEdit && <Link to={`/editpost/${post.id}`} className="absolute top-2 right-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                </Link>}

                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Author: {post?.author?.username}</p>
                <div className="text-gray-800">
                    {post?.content ? parse(post?.content) : 'loading'}
                </div>
            </div>
        </Link>
    )
}

export default PostCard

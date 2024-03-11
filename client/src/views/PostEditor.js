import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPostbyId } from '../slices/posts/postApi';
import Toast from '../components/Toast';
import { useParams } from 'react-router-dom';
import { getCurrentPost } from '../slices/posts/postSlice';

const PostEditor = () => {
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector(getCurrentPost);


    const [title, setTitle] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    useEffect(() => {
        if (postId) {
            dispatch(fetchPostbyId({ id: postId }));
        }
    }, []);

    useEffect(() => {
        if (postId && editorRef) {
            setTitle(post?.title || '');
            if (editorRef.current && post?.content) {
                editorRef.current.setContent(post.content);
            }
        }
    }, [post?.content]);

    const handleClick = () => {
        if (postId) {

        }
        else {
            if (editorRef.current) {
                const content = editorRef.current.getContent();
                dispatch(createPost({ title, content }));
            }
        }

    };

    return (
        <>
            <Toast />
            <div className="mb-4">
                <label className="block mb-2 font-bold my-10 ml-2">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <label className="block mb-2 font-bold my-10 ml-2">Content:</label>
            <Editor
                apiKey='p4g8wd4vf0rb9eex4lrwhii4erz2tidhq0q77y19v7osjheq'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={postId && post?.content ? post?.content : "<p>This is the initial content of the editor.</p>"}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />

            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-4 mx-4 px-4 rounded">
                {postId ? 'Update Post' : 'Publish Post'}
            </button>
        </>
    );
};

export default PostEditor;

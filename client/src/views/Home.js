import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../slices/posts/postApi';
import Toast from '../components/Toast';



const ITEMS_PER_PAGE = 20;

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post);
    const postsData = useSelector((state) => state.post.posts ?? []);

    const totalPages = Math.ceil(post.totalCount / ITEMS_PER_PAGE);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    useEffect(() => {
        dispatch(fetchPosts({ searchTerm, pageSize: ITEMS_PER_PAGE, page: currentPage, authorName: filterAuthor }));
    }, [dispatch, searchTerm, currentPage, ITEMS_PER_PAGE, filterAuthor]);

    return (
        <div className="container mx-auto mt-8">
            <Toast />
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded p-2 w-1/4"
                />
                <input
                    type="text"
                    placeholder="Filter by author..."
                    value={filterAuthor}
                    onChange={(e) => setFilterAuthor(e.target.value)}
                    className="border rounded p-2 w-1/4"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {postsData.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            <div className="flex justify-between mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <div>{`Page ${currentPage} of ${totalPages}`}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div >
    );
};

export default Home;

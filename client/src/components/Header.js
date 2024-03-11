import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getToken, logoutUser } from '../slices/users/userSlice';

const Header = ({ }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken');;
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const isLoginPage = location.pathname === '/login';
    const showSignUp = isLoginPage;

    const handleLogout = () => {
        setIsAuthenticated(false);
        dispatch(logoutUser());
        localStorage.removeItem('accessToken');
    }
    useEffect(() => {
        console.log('header', token);
        setIsAuthenticated(!!token);
    }, [token]);

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="text-lg font-bold">
                    <img
                        src="favicon.ico"
                        alt="Logo"
                        className="h-8 mr-2"
                    />
                </Link>
                <div className='ml-3'>Blog Post</div>
            </div>

            <div className="flex items-center">
                {isAuthenticated ? (
                    <>
                        <Link to="/home" className="mr-4">
                            Home
                        </Link>
                        <Link to="/your-posts" className="mr-4">
                            Your Posts
                        </Link>
                        <Link to="/profile" className="mr-4">
                            Profile
                        </Link>
                        <Link to="/login" className="mr-4" onClick={handleLogout}>
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        {!isLoginPage && (
                            <Link to="/login" className="mr-4">
                                Login
                            </Link>
                        )}
                        {showSignUp && (
                            <Link to="/signup" className="mr-4" >
                                Sign Up
                            </Link>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;

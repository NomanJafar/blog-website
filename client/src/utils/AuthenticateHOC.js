// RequiresAuthenticationHOC.js

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../slices/users/userSlice';

const RequiresAuthentication = (WrappedComponent) => {
    const WithAuthentication = (props) => {
        const navigate = useNavigate();

        const isAuthenticated = localStorage.getItem('accessToken') ? true : false;

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/login');
            }
        }, [isAuthenticated, navigate]);

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return WithAuthentication;
};

export default RequiresAuthentication;

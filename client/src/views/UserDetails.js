import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../slices/users/userSlice';
import { loginUser } from '../slices/users/userApi';
const UserDetails = () => {
    const userDetails = useSelector(getUserDetails);
    console.log(userDetails)
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])


    return (
        <div>
            <h2>User Details</h2>
            <p>User email: {userDetails?.user?.email}   </p>
            <p>Username: {userDetails?.user?.username}</p>
            <p>User Role: {userDetails?.user?.role}</p>
        </div>
    );
};

export default UserDetails;

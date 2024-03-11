import React from 'react';
import { useParams } from 'react-router-dom';
const UserDetails = ({ match }) => {
    const { id } = useParams();

    return (
        <div>
            <h2>User Details</h2>
            <p>User ID: {id}</p>
        </div>
    );
};

export default UserDetails;

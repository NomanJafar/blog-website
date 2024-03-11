// Loader.jsx
import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = ({ loading }) => {
    return (
        <div className="sweet-loading">
            <ClipLoader color={'#123abc'} loading={loading} css={override} size={150} />
        </div>
    );
};

export default Loader;

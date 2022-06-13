import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const Posts = props => {
    return (
        <>
            {' '}
            <div>Posts</div>
            <IsGrid>
                <Post height="100%" width="100%" />
                <Post height="100%" width="100%" />
            </IsGrid>
        </>
    );
};
const IsGrid = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
`;
export default Posts;

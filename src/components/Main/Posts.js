import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const Posts = props => {
    const { postlist } = props;
    return (
        <>
            <IsGrid>
                {postlist?.map((data, index) => (
                    <Post
                        key={index}
                        height="100%"
                        width="100%"
                        data={data}
                        index={index}
                    />
                ))}
            </IsGrid>
        </>
    );
};
const IsGrid = styled.div`
    display: grid;

    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 20px;
`;
export default Posts;

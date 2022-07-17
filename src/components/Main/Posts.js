import React, { useState } from 'react';
import styled from 'styled-components';
import ModaPostDetail from '../Modal/ModaPostDetail';
import Post from './Post';

const Posts = props => {
    const { postlist } = props;

    return (
        <>
            <IsGrid>
                {postlist?.map((data, index) => {
                    if (!data?.deleted) {
                        return (
                            <Post
                                key={index}
                                height="100%"
                                width="100%"
                                data={data}
                                index={index}
                                onClick={() => {
                                    setModalPost(true);
                                }}
                            />
                        );
                    }
                })}
            </IsGrid>
        </>
    );
};
const IsGrid = styled.div`
    display: grid;
    width: 100%;
    height: calc(100% - 5rem);
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 20px;
`;
export default Posts;

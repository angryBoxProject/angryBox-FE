import React from 'react';
import styled from 'styled-components';
import theme from '../../Styles/theme';

const Post = props => {
    const { width, height } = props;
    return (
        <>
            <Warp width={width} height={height}>
                Post
            </Warp>
        </>
    );
};
const Warp = styled.div`
    background: linear-gradient(
        to bottom,
        ${theme.color.black},
        ${theme.color.red}
    );
    width: ${props => props.width};
    height: ${props => props.height};
`;
export default Post;

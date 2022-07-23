import React from 'react';
import styled from 'styled-components';

const FlexDiv = props => {
    const {
        children,
        padding,
        margin,
        column,
        justify,
        align,
        grow,
        onClick,
        height,
        width,
    } = props;
    const styles = {
        margin: margin,
        padding: padding,
        column: column,
        justify: justify,
        align: align,
        grow: grow,
        height: height,
        width: width,
    };
    return (
        <>
            <Flex onClick={onClick} {...styles}>
                {children}
            </Flex>
        </>
    );
};

const Flex = styled.div`
    position: relative;
    display: flex;
    flex-direction: ${props => (props.column ? 'column' : 'row')};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    flex-grow: ${props => props.grow};
    ${props => (props.height ? `height:${props.height}` : '')}
    ${props => (props.width ? `width:${props.width}` : '')}
`;
export default FlexDiv;

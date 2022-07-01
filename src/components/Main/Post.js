import React from 'react';
import styled from 'styled-components';
import { FlexDiv } from '../../elements';
import theme from '../../Styles/theme';
import moment from 'moment';
import { ReactComponent as Locked } from '../../static/image/Locked.svg';
import { ReactComponent as UnLocked } from '../../static/image/UnLock.svg';

const Post = props => {
    const { width, height, data, index } = props;
    console.log(data);
    return (
        <>
            {data && (
                <BackGround>
                    <Warp width={width} height={height}>
                        <FlexDiv juFlexDiv justify="space-between">
                            <div>NO.{data.diaryNo}</div>
                            <Lockicon>
                                {data.public ? <UnLocked /> : <Locked />}
                            </Lockicon>
                        </FlexDiv>
                        <FlexDiv>
                            <FlexDiv column="column">
                                <div>
                                    {moment(data.dateTime).format('MM.DD')}
                                </div>
                                <div>{data.title}</div>
                            </FlexDiv>
                            <div>{data.content}</div>
                        </FlexDiv>
                    </Warp>
                </BackGround>
            )}
        </>
    );
};
const BackGround = styled.div`
    background-color: #5a5a5a;
`;
const Warp = styled.div`
    background: linear-gradient(
        to bottom,
        rgba(218, 70, 60, 0),
        rgba(218, 70, 60, 1)
    );
    width: ${props => props.width};
    min-width: 306px;
    height: ${props => props.height};
    min-height: 266px;
    color: #222222;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    padding: 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Lockicon = styled.div`
    position: absolute;
    top: -10px;
    right: -10px;
`;
export default Post;
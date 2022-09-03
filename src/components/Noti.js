import React from 'react';
import styled from 'styled-components';
import { FlexDiv } from '../elements';
import theme from '../Styles/theme';
import Moment from 'react-moment';

const Noti = props => {
    const {
        notiid,
        diaryId,
        sendMemberId,
        receiveMemberId,
        content,
        checked,
        dateTime,
        setModalPost,
    } = props;
    const displayCreatedAt = createdAt => {
        let startTime = new Date(createdAt);
        let nowTime = Date.now();
        if (parseInt(startTime - nowTime) > -60000) {
            return <Moment format="방금 전">{startTime}</Moment>;
        }
        if (parseInt(startTime - nowTime) < -86400000) {
            return <Moment format="MMM D일">{startTime}</Moment>;
        }
        if (parseInt(startTime - nowTime) > -86400000) {
            return <Moment fromNow>{startTime}</Moment>;
        }
    };

    return (
        <>
            <Warp
                id={notiid}
                onClick={() => {
                    props.setModalPost(notiid);
                }}
            >
                <FlexDiv justify="space-between" align="center">
                    <Subtitle>쓰담받음</Subtitle>
                    <SubtitleDate>{displayCreatedAt(dateTime)}</SubtitleDate>
                </FlexDiv>
                <ContentStyle>{content}</ContentStyle>
            </Warp>
        </>
    );
};
const Warp = styled.div``;
const Subtitle = styled.div`
    background: #f6f6f6;
    padding: 3px 8px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #813bf3;
`;
const SubtitleDate = styled.div`
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #ffffff;
`;
const ContentStyle = styled.div`
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #ffffff;
    padding: 13px 0 35px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;
export default Noti;

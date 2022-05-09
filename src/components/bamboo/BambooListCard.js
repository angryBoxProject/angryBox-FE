import React from 'react';
import theme from '../../Styles/theme';
import styled from 'styled-components';
import { FlexDiv } from '../../elements';
import { ReactComponent as View } from '../../static/image/View.svg';
import { ReactComponent as Todack } from '../../static/image/Todack.svg';

const BambooListCard = props => {
    const {
        key,
        angryPhaseId,
        coinBankId,
        content,
        dailyTopId,
        dateTime,
        diaryNo,
        id,
        isPublic,
        memberId,
        title,
        todackCount,
        todayTopId,
        viewCount,
    } = props;
    return (
        <>
            <Warp>
                <FlexDiv justify="space-between">
                    <div>{title}</div>
                    <FlexDiv>
                        <Todack />
                        <div>{todackCount}</div>
                        <View />
                        <div>{viewCount}</div>
                    </FlexDiv>
                </FlexDiv>
                <div>{dateTime}</div>
                <div>{content}</div>
            </Warp>
        </>
    );
};
const Warp = styled.div`
    width: 100%;
    min-height: 188px;
    background-color: ${theme.color.black2};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin: 20px 0px 0px 0px;
`;
export default BambooListCard;

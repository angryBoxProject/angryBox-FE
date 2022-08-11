import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FlexDiv } from '../../elements';
import { useMonthprofile } from '../../hooks/useMonthprofile';

const AngryBookProfile = props => {
    const nickname = useSelector(state => state.member.user_info).nickname;

    const {
        status,
        data: profilelist,
        error,
        isFetching,
        refetch,
    } = useMonthprofile();
    const monthdate = date => {
        return moment(date, 'YYYY-MM-DD').month() + 1;
    };
    const renderByStatus = useCallback(() => {
        switch (status) {
            case 'loading':
                return <div>loading</div>;
            case 'error':
                if (error instanceof Error) {
                    return <span>Error: {error.message}</span>;
                }
                break;
            default:
                return (
                    <>
                        <FlexDiv column="column">
                            <FlexDiv
                                justify="space-between"
                                padding="0 20px 8px"
                            >
                                <Underline>분노 계좌번호</Underline>
                                <BankAccount>
                                    {profilelist.bankAccount}
                                </BankAccount>
                            </FlexDiv>
                            <FlexDiv
                                justify="space-between"
                                padding="8px 20px 0"
                            >
                                <Underline>총 쓰담 수</Underline>
                                <RecieveTodackCount>
                                    {profilelist.recieveTodackCount}{' '}
                                    <Text>회</Text>
                                </RecieveTodackCount>
                            </FlexDiv>
                        </FlexDiv>
                    </>
                );
        }
    }, [status, isFetching]);
    return (
        <>
            <Wrap>
                <TitleWrap>
                    <Nickname>{nickname} </Nickname>
                    <Title>
                        님의 {monthdate(moment())}월 분노 적금 통계입니다.
                    </Title>
                </TitleWrap>
                <div>{renderByStatus()}</div>
            </Wrap>
        </>
    );
};
const Wrap = styled.div`
    width: 100%;
    padding-bottom: 39px;
    border-bottom: solid 1px #737373;
`;
const TitleWrap = styled.div`
    padding-bottom: 52px;
`;
const Nickname = styled.span`
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
    color: #282828;
`;
const Title = styled.span`
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    color: #282828;
`;
const Underline = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    text-decoration-line: underline;
    color: #282828;
`;
const BankAccount = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    text-align: right;
    color: #282828;
`;
const RecieveTodackCount = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    text-align: right;
    color: #282828;
`;
const Text = styled.span`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    text-align: right;
    color: #282828;
`;

export default AngryBookProfile;

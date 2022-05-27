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
                        <FlexDiv column="column" padding="0px 13% 0px 0px">
                            <FlexDiv
                                justify="space-between"
                                padding="9px 18px 9px 18px"
                            >
                                <Underline>분노 계좌번호</Underline>
                                <div>{profilelist.bankAccount}</div>
                            </FlexDiv>
                            <FlexDiv
                                justify="space-between"
                                padding="9px 18px 9px 18px"
                            >
                                <Underline>총 쓰담 수</Underline>
                                <div>{profilelist.recieveTodackCount}</div>
                            </FlexDiv>
                        </FlexDiv>
                    </>
                );
        }
    }, [status, isFetching]);
    return (
        <>
            <div style={{ maxHeight: '30%', padding: '10% 0 20% 0' }}>
                <Nickname>{nickname}</Nickname>
                <Title>님의 4월 분노 적금 통계입니다.</Title>
                <div>{renderByStatus()}</div>
            </div>
            <hr style={{ paddingBottom: '3%' }}></hr>
        </>
    );
};
const Nickname = styled.span`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    /* identical to box height */

    text-align: right;
`;
const Title = styled.span`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
`;
const Underline = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height */

    text-decoration-line: underline;
`;

export default AngryBookProfile;

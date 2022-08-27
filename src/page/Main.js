import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { URL } from '../Apis/API';
import { setUserName } from '../redux/modules/member';
import { Button, FlexDiv, MainCard } from '../elements';
import { WriteAngryModal } from '../components/Main/WriteAngryModal';
import { ViewDetailModal } from '../components/Main/ViewDetailModal';
import { CreateDiary, mainPageLoad } from '../redux/modules/diary';

import theme from '../Styles/theme';
import styled from 'styled-components';
import { useBank } from '../hooks/useBank';
import ModalMakeBank from '../components/Modal/ModalMakeBank';
import Posts from '../components/Main/Posts';
import { getBankPostList } from '../redux/modules/main';
import PostList from '../components/Main/PostList';
import ModalMakePost from '../components/Modal/ModalMakePost';
import { expiredBank } from '../redux/modules/bank';

import TitleWrap from '../Layouts/TitleWrap';
import Contents from '../Layouts/Contents';
import MainLayout from '../Layouts/MainLayout';
import { style } from '@mui/system';

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('asdf');
    // const { openModal } = props;
    const [isOpen, setOpen] = useState(false);
    const [isViewOpen, setViewOpen] = useState(false);
    const memberNick = localStorage.getItem('nickname');
    const mainlastDiaryId = useSelector(state => state.main.lastDiaryId);
    const [modalmakebank, Setmodalmakebank] = useState(false);
    const [modalmakePost, SetmodalmakePost] = useState(false);

    const { status, data: banklist, error, isFetching, refetch } = useBank();
    const isbreakbank = banklist?.remainingDiaryNum.length === 0 ? true : false;
    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const openViewDetail = () => {
        setViewOpen(true);
    };

    const closeViewDetail = () => {
        setViewOpen(false);
    };

    const angryPhase = id => {
        const list = ['극대노', '대노', '중노', '소노', '극소노'];
        return list[id - 1];
    };

    useEffect(() => {
        // dispatch(mainPageLoad(dispatch));
    }, []);

    const renderByStatus = useCallback(() => {
        switch (status) {
            case 'loading':
                return <div>loading</div>;
            case 'error':
                if (error instanceof Error) {
                    return (
                        <Containers>
                            <FlexLeft>
                                <TextBox>
                                    <div>
                                        <NonBankSubTitle>
                                            새 적금을
                                            <br /> 만들어보세요!
                                        </NonBankSubTitle>
                                        <NoneBankText>
                                            적금 정보가 존재하지 않습니다.
                                        </NoneBankText>
                                    </div>
                                    <FlexDiv
                                        column="row"
                                        justify="space-between"
                                        margin="0 0 28px"
                                    >
                                        <CreditStatus>
                                            <CreaditStatusTxt1>
                                                현재 {memberNick}님의
                                            </CreaditStatusTxt1>
                                            <CreaditStatusTxt2>
                                                신용상태는
                                            </CreaditStatusTxt2>
                                        </CreditStatus>
                                        <CreditStatusValue>
                                            {banklist.creditStatus}
                                        </CreditStatusValue>
                                    </FlexDiv>
                                </TextBox>
                                <Button
                                    onClick={() => {
                                        Setmodalmakebank(true);
                                    }}
                                >
                                    새 적금 만들기
                                </Button>
                            </FlexLeft>
                            {/* <TitleWrap title="Home">
                                <div>{banklist.name}</div>
                                <Total>총 게시글 수 <TotalCount>{banklist.diaryCount}</TotalCount></Total>
                                <Total>총 쓰담 수 <TotalCount>{banklist.todackCount}</TotalCount></Total>
                            </TitleWrap>
                            <div style={{ width: '40%', height: '90%' }}>
                                <FlexDiv column="column" height="98%">
                                    <NonBankSubTitle>
                                        새 적금을
                                        <br /> 만들어보세요!
                                    </NonBankSubTitle>
                                    <NoneBankText>
                                        적금 정보가 존재하지 않습니다.
                                    </NoneBankText>
                                    <CreditStatus>
                                        <div>현재 소연님의</div>
                                        <FlexDiv justify="space-between">
                                            <div
                                                style={{
                                                    fontFamily: 'Noto Sans',
                                                    fontStyle: 'normal',
                                                    fontWeight: '700',
                                                    fontSize: ' 42.0723px',
                                                    lineHeight: ' 57px',
                                                }}
                                            >
                                                신용상태는
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily: 'Nato Sans',
                                                    fontStyle: 'normal',
                                                    fontWeight: '700',
                                                    fontSize: '76.3988px',
                                                    lineHeight: '32px',
                                                    textAlign: 'right',
                                                    color: `${theme.color.red}`,
                                                }}
                                            >
                                                -
                                            </div>
                                        </FlexDiv>
                                    </CreditStatus>
                                </FlexDiv>
                            </div>
                            <Button
                                onClick={() => {
                                    Setmodalmakebank(true);
                                }}
                                width="94%"
                            >
                                새 적금 만들기
                            </Button> */}
                        </Containers>
                    );
                }
                break;
            default:
                return (
                    <Containers>
                        <FlexLeft>
                            <TextBox>
                                {isbreakbank ? (
                                    <div>
                                        <BreakBank>분노 적금 만땅!</BreakBank>
                                        <BreakBankSubtitle>
                                            {banklist.reward}
                                        </BreakBankSubtitle>
                                    </div>
                                ) : (
                                    <div>
                                        <Subtitle>곧 터지기 직전!</Subtitle>
                                        <AngryState>
                                            <div>
                                                <p>
                                                    극대노{' '}
                                                    <span
                                                        style={{
                                                            color: '#DA463C',
                                                        }}
                                                    >
                                                        {
                                                            banklist
                                                                .remainingDiaryNum[4]
                                                        }
                                                        번
                                                    </span>
                                                </p>
                                                <p>
                                                    대노{' '}
                                                    <span
                                                        style={{
                                                            color: '#EA675E',
                                                        }}
                                                    >
                                                        {
                                                            banklist
                                                                .remainingDiaryNum[3]
                                                        }
                                                        번
                                                    </span>
                                                </p>
                                                <p>
                                                    중대노{' '}
                                                    <span
                                                        style={{
                                                            color: '#E2766F',
                                                        }}
                                                    >
                                                        {
                                                            banklist
                                                                .remainingDiaryNum[2]
                                                        }
                                                        번
                                                    </span>
                                                </p>
                                                <p>
                                                    소대노{' '}
                                                    <span
                                                        style={{
                                                            color: '#E38E88',
                                                        }}
                                                    >
                                                        {
                                                            banklist
                                                                .remainingDiaryNum[1]
                                                        }
                                                        번
                                                    </span>
                                                </p>
                                                <p>
                                                    극소노{' '}
                                                    <span
                                                        style={{
                                                            color: '#E8AEAA',
                                                        }}
                                                    >
                                                        {
                                                            banklist
                                                                .remainingDiaryNum[0]
                                                        }
                                                        번
                                                    </span>
                                                </p>
                                            </div>
                                            <div>남았어요!</div>
                                        </AngryState>
                                    </div>
                                )}
                                <FlexDiv
                                    column="row"
                                    justify="space-between"
                                    margin="0 0 28px"
                                >
                                    <CreditStatus>
                                        <CreaditStatusTxt1>
                                            현재 {memberNick}님의
                                        </CreaditStatusTxt1>
                                        <CreaditStatusTxt2>
                                            신용상태는
                                        </CreaditStatusTxt2>
                                    </CreditStatus>
                                    <CreditStatusValue>
                                        {banklist.creditStatus}
                                    </CreditStatusValue>
                                </FlexDiv>
                            </TextBox>
                            <Button
                                is_disabled={!isbreakbank}
                                onClick={() => {
                                    console.log('test');
                                    // dispatch(CreateDiary({ dispatch, "test" }));
                                    const data = { id: banklist.id };
                                    dispatch(expiredBank({ data, navigate }));
                                }}
                            >
                                {isbreakbank
                                    ? '버튼을 눌러 적금을 깨보세요!!'
                                    : '아직 적금을 깰 수 없습니다.'}
                            </Button>
                        </FlexLeft>
                        <FlexRight>
                            <Posts bankId={banklist.id} />
                            <Button
                                onClick={() => {
                                    // dispatch(CreateDiary({ dispatch, "test" }));
                                    SetmodalmakePost(true);
                                }}
                            >
                                분노 저금하기
                            </Button>
                        </FlexRight>
                    </Containers>
                );
        }
    }, [status, isFetching]);

    useEffect(() => {
        if (status === 'success') {
            const data = {
                coinBankId: banklist.id,
                lastDiaryId: mainlastDiaryId,
            };
            dispatch(getBankPostList(data));
        }
    }, []);

    const { diaryCount, todackCount } = banklist || '0';

    return (
        <>
            <MainLayout nav={true}>
                <Contents header={true}>
                    <TitleWrap title="Home">
                        {banklist && (
                            <>
                                <UtilLink>이번달은 진짜로!</UtilLink>
                                <Total>
                                    총 게시글 수{' '}
                                    <TotalCount>{diaryCount}</TotalCount>
                                </Total>
                                <Total>
                                    총 쓰담 수{' '}
                                    <TotalCount>{todackCount}</TotalCount>
                                </Total>
                            </>
                        )}
                    </TitleWrap>

                    {renderByStatus()}
                </Contents>
            </MainLayout>

            <ModalMakeBank
                title="CREATE"
                subtitle="분노 적금 만들기"
                width="70%"
                height="80%"
                open={modalmakebank}
                close={() => {
                    Setmodalmakebank(false);
                }}
            />
            {banklist && (
                <ModalMakePost
                    title="ANGRY SAVING"
                    subtitle="분노 게시글 작성"
                    width="70%"
                    height="80%"
                    open={modalmakePost}
                    close={() => {
                        SetmodalmakePost(false);
                    }}
                    coinBankId={banklist.id}
                ></ModalMakePost>
            )}
        </>
    );
};

const NonBankSubTitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 90px;
    line-height: 123px;
    color: #f6f6f6;
`;

const NoneBankText = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 65px;
    color: #f6f6f6;
    padding: 82px 0px 0;
`;

const CreditStatus = styled.div`
    display: flex;
    position: absolute;
    bottom: 0%;
    left: 0%;
    flex-direction: column;
    width: 100%;
`;

const TextBox = styled.div`
    width: 100%;
    height: calc(100vh - 290px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    overflow-y: auto;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        //display: none; /* Chrome , Safari , Opera */
        width: 8px;
        background-color: ${theme.color.black2};
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${theme.color.red};
        border-radius: 40px;
    }
    ::-webkit-scrollbar-track {
        background-color: ${theme.color.black2};
        border-radius: 40px;
    }
`;

const CreaditStatusTxt1 = styled.p`
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    color: #f6f6f6;
`;

const CreaditStatusTxt2 = styled.p`
    font-weight: 700;
    font-size: 42.0723px;
    line-height: 57px;
    color: #f6f6f6;
`;

const CreditStatusValue = styled.p`
    font-weight: 700;
    font-size: 76.3988px;
    line-height: 104px;
    text-align: right;
    color: #da463c;
`;

const Subtitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 90px;
    line-height: 123px;
    color: #f6f6f6;
    margin-bottom: 22px;
    letter-spacing: -0.04em;
`;
const BreakBank = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 90px;
    line-height: 123px;
    color: #c4433b;
    margin-bottom: 22px;
`;
const BreakBankSubtitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 68px;
    line-height: 93px;
    color: #f6f6f6;
`;
const AngryState = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 68px;
    line-height: 93px;
    color: #f6f6f6;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;
const UtilLink = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    color: #f6f6f6;
    margin-right: 5vw;
`;
const Total = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: #f6f6f6;
    margin-left: 1.5vw;
`;
const TotalCount = styled.span`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #da463c;
    margin-left: 0.5vw;
`;
const Containers = styled.div`
    width: 100%;
    height: calc(100vh - 190px);
    padding: 0 5vw 0 0;
    display: flex;
`;
const FlexLeft = styled.div`
    width: 100%;
    min-width: 633px;
    height: calc(100vh - 290px);
    margin-right: 2.5vw;
`;
const FlexRight = styled.div`
    width: 100%;
    height: calc(100vh - 290px);
`;

export default Main;

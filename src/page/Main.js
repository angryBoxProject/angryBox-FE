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

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { openModal } = props;
    const [isOpen, setOpen] = useState(false);
    const [isViewOpen, setViewOpen] = useState(false);
    const memberNick = localStorage.getItem('nickname');
    const mainlastDiaryId = useSelector(state => state.main.lastDiaryId);
    const [modalmakebank, Setmodalmakebank] = useState(false);
    const [modalmakePost, SetmodalmakePost] = useState(false);

    const { status, data: banklist, error, isFetching, refetch } = useBank();
    console.log('banklist', banklist);
    console.log('banklist', banklist?.remainingDiaryNum.length);
    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const openViewDetail = () => {
        console.log('zzz');
        setViewOpen(true);
    };

    const closeViewDetail = () => {
        setViewOpen(false);
    };

    const angryPhase = id => {
        const list = ['극대노', '대노', '중노', '소노', '극소노'];
        return list[id];
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
                        <>
                            <div style={{ width: '40%', height: '90%' }}>
                                <FlexDiv column="column" height="98%">
                                    <Title>HOME</Title>
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
                                    console.log('button click');
                                }}
                                width="94%"
                            >
                                새 적금 만들기
                            </Button>
                        </>
                    );
                }
                break;
            default:
                return (
                    <>
                        <FlexDiv>
                            <FlexDiv column="column">
                                <Title>HOME</Title>
                                <Subtitle>곧 터지기 직전!</Subtitle>
                                <AngryState>
                                    <FlexDiv column="column">
                                        <p>
                                            극대노{' '}
                                            {banklist.remainingDiaryNum[4]}번
                                        </p>
                                        <p>
                                            대노 {banklist.remainingDiaryNum[3]}
                                            번
                                        </p>
                                        <p>
                                            중노 {banklist.remainingDiaryNum[2]}
                                            번
                                        </p>
                                        <p>
                                            소노 {banklist.remainingDiaryNum[1]}
                                            번
                                        </p>
                                        <p>
                                            극소노{' '}
                                            {banklist.remainingDiaryNum[0]}번
                                        </p>{' '}
                                        남았어요!
                                    </FlexDiv>
                                </AngryState>
                                <FlexDiv>
                                    <div>
                                        <p>현재 {memberNick}님의</p>
                                        <p>신용상태는</p>
                                    </div>
                                    <p>{banklist.creditStatus}</p>
                                </FlexDiv>
                                <Button
                                    is_disabled={true}
                                    onClick={() => {
                                        // dispatch(CreateDiary({ dispatch, "test" }));
                                        console.log('test');
                                    }}
                                >
                                    아직 적금을 깰 수 없습니다.
                                </Button>
                            </FlexDiv>
                            <FlexDiv column="column" width="50%">
                                <FlexDiv justify="space-between">
                                    <div>{banklist.name}</div>
                                    <div>총 게시글 {banklist.diaryCount}</div>
                                    <div>총 쓰담 수 {banklist.todackCount}</div>
                                </FlexDiv>
                                <FlexDiv column="column">
                                    <PostList bankId={banklist.id} />
                                </FlexDiv>
                                <FlexDiv>
                                    <Button
                                        onClick={() => {
                                            // dispatch(CreateDiary({ dispatch, "test" }));
                                            SetmodalmakePost(true);

                                            console.log('test');
                                        }}
                                    >
                                        분노 저금하기
                                    </Button>
                                </FlexDiv>
                            </FlexDiv>
                        </FlexDiv>
                    </>
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
    return (
        <>
            <Warp>
                {renderByStatus()}

                {/* <div className="grid grid-cols-2 gap-4">
                <div className="grid col-start-1">
                    <div>HOME</div>
                    <button className="bg-slate-500" onClick={testServer}>
                        testButton
                    </button>
                    <button
                        className="bg-slate-500"
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        testButton2
                    </button>
                </div>
                <div className="grid w-2/3 col-start-2 ">
                    <div>
                        <button>이번 달은 진짜로</button>
                        <span>총 게시글 수 </span>
                        <span>총 쓰담 수 </span>
                    </div>
                    <div className="grid grid-flow-row grid-cols-2 gap-1 place-items-center">
                        <MainCard clickCard={openViewDetail}></MainCard>
                        <MainCard clickCard={openViewDetail}></MainCard>
                        <MainCard clickCard={openViewDetail}></MainCard>
                        <MainCard clickCard={openViewDetail}></MainCard>
                        <MainCard clickCard={openViewDetail}></MainCard>
                        <MainCard clickCard={openViewDetail}></MainCard>
                    </div>
                    <button onClick={openModal} className="bg-blue-300">
                        분노 저금하기
                    </button>
                </div>
            </div>
            <WriteAngryModal open={isOpen} close={closeModal} />
            <ViewDetailModal
                open={isViewOpen}
                temp="zzzzz"
                close={closeViewDetail}
            /> */}
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
            </Warp>
        </>
    );
};

const Warp = styled.div`
    width: 100%;
    height: calc(100vh - 5rem);
    /* padding: 20px 100px 50px 50px; */
    background-color: ${theme.color.black};
`;
const Title = styled.div`
    font-family: 'Hanson';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    /* identical to box height */

    color: #f6f6f6;
`;

const NonBankSubTitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 90px;
    line-height: 123px;
`;

const NoneBankText = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 65px;
    padding: 82px 0px;
`;

const CreditStatus = styled.div`
    display: flex;
    position: absolute;
    bottom: 0%;
    left: 0%;
    flex-direction: column;
    width: 100%;
`;

const Subtitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 80px;
    line-height: 123px;
    /* identical to box height */

    color: #f6f6f6;
`;
const AngryState = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 66px;
    line-height: 93px;

    color: #f6f6f6;

    padding-bottom: 40px;
`;
export default Main;

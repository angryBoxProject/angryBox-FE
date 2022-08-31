import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FlexDiv, MainCard } from '../../elements';

import { useBank } from '../../hooks/useBank';
import { getBankPostList } from '../../redux/modules/main';
import { expiredBank } from '../../redux/modules/bank';

import ModalClearBank from '../../components/Modal/ModalClearBank';
import ModalMakeBank from '../../components/Modal/ModalMakeBank';
import ModalMakePost from '../../components/Modal/ModalMakePost';

import styled from 'styled-components';
import MainLayout from '../../Layouts/MainLayout';
import Contents from '../../Layouts/Contents';
import PostList from '../../components/Main/PostList';

import { ReactComponent as Fire } from '../../static/image/main/main_fire.svg';
import { ReactComponent as ClearButtonIcon } from '../../static/image/main/clearbutton_icon.svg';
import { ReactComponent as ClearButtonIconOn } from '../../static/image/main/clearbutton_icon_on.svg';
import { ReactComponent as ListIconLeft } from '../../static/image/main/list_icon1.svg';
import { ReactComponent as ListIconRight } from '../../static/image/main/list_icon2.svg';
import { ReactComponent as SaveIcon } from '../../static/image/main/save_icon.svg';
import Posts from '../../components/Main/Posts';

const list = ['극대노', '대노', '중노', '소노', '극소노'];

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { openModal } = props;
    const [isOpen, setOpen] = useState(false);
    const [isViewOpen, setViewOpen] = useState(false);
    const [modalmakebank, Setmodalmakebank] = useState(false);
    const [modalmakePost, SetmodalmakePost] = useState(false);
    const [modalbreakBank, SetmodalbreakBank] = useState(false);
    const [modalmakeBank, SetmodalmakeBank] = useState(false);

    const { status, data: banklist, error, isFetching, refetch } = useBank();
    const isbreakbank = banklist?.canCrush
        ? true
        : status !== 'success'
        ? true
        : false;
    const memberNick = localStorage.getItem('nickname');
    const mainlastDiaryId = useSelector(state => state.main.lastDiaryId);
    console.log(banklist, 'isbreakbank');
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

    const renderByStatus = useCallback(() => {
        switch (status) {
            case 'loading':
                return <div>loading</div>;
            case 'error':
                if (error instanceof Error) {
                    return <Containers></Containers>;
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

    console.log('isbreakbank', isbreakbank, status, banklist);
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
    console.log('banklist', banklist);
    return (
        <MainLayout nav={true}>
            <Contents header={true}>
                <StatusArea>
                    {/* 유저 상태에 따라 타이틀 명칭 변경 */}
                    {status !== 'success' ? (
                        <Title>새 적금을 만들어보세요!</Title>
                    ) : (
                        <Title>곧 터지기 직전!</Title>
                    )}
                    <CreditWrap>
                        <CreditLabel>
                            <p style={{ fontSize: '20px', lineHeight: '29px' }}>
                                현재 <b>{memberNick}</b> 님의
                            </p>
                            <p style={{ fontSize: '42px', lineHeight: '61px' }}>
                                <b>신용상태</b>는
                            </p>
                        </CreditLabel>
                        <CreditStatus>
                            {status !== 'success' ? (
                                <CreditStatusValue>-</CreditStatusValue>
                            ) : (
                                <CreditStatusValue>
                                    {banklist?.creditStatus}
                                </CreditStatusValue>
                            )}
                            <div style={{ width: '66px' }}>
                                <Fire />
                            </div>
                        </CreditStatus>
                    </CreditWrap>
                    <ClearButton
                        onClick={() => {
                            if (status !== 'success') {
                                SetmodalmakeBank(true);
                                return;
                            }
                            SetmodalbreakBank(true);
                            const data = {
                                id: banklist.id,
                            };
                            dispatch(expiredBank({ data, navigate }));
                        }}
                        style={{
                            border: isbreakbank
                                ? 'solid 3px #813BF3'
                                : 'solid 3px #ECECEC',
                        }}
                    >
                        {status !== 'success' ? (
                            <ClearButtonValue
                                style={{
                                    color: isbreakbank ? '#813BF3' : '#737373',
                                }}
                            >
                                {isbreakbank
                                    ? '적금을 생성하세요!'
                                    : '아직 적금을 깰 수 없습니다.'}
                            </ClearButtonValue>
                        ) : (
                            <ClearButtonValue
                                style={{
                                    color: isbreakbank ? '#813BF3' : '#737373',
                                }}
                            >
                                {isbreakbank
                                    ? '버튼을 눌러 적금을 깨보세요!!'
                                    : '아직 적금을 깰 수 없습니다.'}
                            </ClearButtonValue>
                        )}

                        {isbreakbank ? (
                            <ClearButtonIconOn />
                        ) : (
                            <ClearButtonIcon />
                        )}
                    </ClearButton>
                </StatusArea>
                {banklist && (
                    <ListArea>
                        <ListDesc>
                            <>
                                <UtilLink>
                                    <ListIconLeft />
                                    <UtilLinkText>
                                        이번달은 진짜로!
                                    </UtilLinkText>
                                    <ListIconRight />
                                </UtilLink>
                                <TotalWrap>
                                    <Total>
                                        총 게시글 수{' '}
                                        <TotalCount>{diaryCount}</TotalCount>
                                    </Total>
                                    <Total>
                                        총 쓰담 수{' '}
                                        <TotalCount>{todackCount}</TotalCount>
                                    </Total>
                                </TotalWrap>
                            </>
                        </ListDesc>
                        <Posts bankId={banklist.id} />

                        <SaveButtonWrap></SaveButtonWrap>
                        <SaveButton
                            onClick={() => {
                                // dispatch(CreateDiary({ dispatch, "test" }));
                                SetmodalmakePost(true);
                            }}
                        >
                            <SaveButtonText>분노 저금하기</SaveButtonText>
                            <SaveIcon />
                        </SaveButton>
                    </ListArea>
                )}
            </Contents>

            {modalmakebank && (
                <ModalMakeBank
                    title="분노 적금 만들기"
                    modalType="form"
                    close={() => {
                        Setmodalmakebank(false);
                    }}
                />
            )}

            {banklist && modalmakePost && (
                <ModalMakePost
                    title="분노 게시글 작성"
                    modalType="form"
                    close={() => {
                        SetmodalmakePost(false);
                    }}
                />
            )}
            {modalbreakBank && (
                <ModalClearBank
                    modalType="info"
                    close={() => SetmodalbreakBank(false)}
                    bankId={banklist?.id}
                />
            )}
            {modalmakeBank && (
                <ModalMakeBank
                    title="분노 적금 만들기"
                    modalType="form"
                    close={() => {
                        SetmodalmakeBank(false);
                    }}
                />
            )}
        </MainLayout>
    );
};

const StatusArea = styled.div`
    width: 100%;
    padding: 72px 0 103px;
`;

const Title = styled.div`
    font-weight: 700;
    font-size: 90px;
    line-height: 130px;
    text-align: center;
    color: #282828;
    margin-bottom: 64px;
`;
const CreditWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 571px;
    margin: 0 auto 88px;
`;
const CreditLabel = styled.div`
    color: #282828;
`;
const CreditStatus = styled.div`
    display: flex;
    align-items: center;
`;
const CreditStatusValue = styled.div`
    font-weight: 700;
    font-size: 76.3988px;
    line-height: 111px;
    color: #813bf3;
    margin-right: 20px;
`;
const ClearButton = styled.button`
    width: 100%;
    max-width: 427px;
    height: 46px;
    border: solid 3px #ececec;
    border-radius: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;
const ClearButtonValue = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #737373;
    margin-right: 15px;
`;
const ListArea = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 94px;
`;
const ListDesc = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 31px;
`;
const UtilLink = styled.div`
    display: flex;
    align-items: center;
`;
const UtilLinkText = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #282828;
`;
const TotalWrap = styled.div`
    display: flex;
    align-items: center;
`;
const Total = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
    margin-left: 31px;
`;
const TotalCount = styled.span`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
    margin-left: 15px;
`;
const SaveButtonWrap = styled.div`
    width: 100%;
    height: 250px;
    background: rgb(246, 246, 246);
    background: linear-gradient(
        0deg,
        rgba(246, 246, 246, 1) 30%,
        rgba(0, 212, 255, 0) 100%
    );
    position: absolute;
    bottom: 90px;
    left: 0;
`;
const SaveButton = styled.button`
    width: 100%;
    max-width: 436px;
    height: 46px;
    border: solid 3px #813bf3;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: absolute;
    bottom: 176px;
    left: 50%;
    transform: translate(-50%, 0);
`;
const SaveButtonText = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    color: #813bf3;
    margin-right: 10px;
`;

export default Main;

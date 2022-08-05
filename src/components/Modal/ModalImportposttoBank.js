import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import {
    getBankFirstPostList,
    getBankPostList,
} from '../../redux/modules/bank';

import ModaPostOneDetail from './ModaPostOneDetail';

const ModalImportposttoBank = props => {
    const {
        open,
        close,
        width,
        height,
        title,
        subtitle,
        bankId,
        contents,
        _onChange,
        listclick,
    } = props;
    const { lastDiaryId, bankpostlist, hasMoreBankPosts, Postlistloading } =
        useSelector(state => state.bank);
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const isMount = useIsMount();
    const [modalPost, setModalPostDetail] = useState();
    const [modaldata, setModalData] = useState(0);

    useEffect(() => {
        const data = {
            coinBankId: bankId,
            lastDiaryId: lastDiaryId,
        };

        dispatch(getBankFirstPostList(data));
    }, [bankId]);
    useEffect(() => {
        function onScroll() {
            const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;

            if (clientHeight + scrollTop > scrollHeight - 30) {
                if (
                    hasMoreBankPosts &&
                    bankpostlist &&
                    !Postlistloading &&
                    isMount.current
                ) {
                    const data = {
                        coinBankId: bankId,
                        lastDiaryId: lastDiaryId,
                    };

                    dispatch(getBankPostList(data));
                }
            }
        }
        if (scrollRef.current !== undefined)
            scrollRef.current.addEventListener('scroll', onScroll);
        return () => {
            if (scrollRef.current !== undefined)
                scrollRef.current.removeEventListener('scroll', onScroll);
        };
    }, [
        hasMoreBankPosts,
        bankpostlist,
        Postlistloading,
        isMount,
        bankId,
        scrollRef,
    ]);

    return (
        <>
            <div className={open ? 'openModal modal' : 'modal'}>
                {open ? (
                    <>
                        <Section>
                            <MainModal width={width} height={height}>
                                <ModalPopup>
                                    <FlexDiv
                                        justify="space-between"
                                        padding="10px"
                                    >
                                        <FlexDiv>
                                            <ModalTitle>{title}</ModalTitle>
                                            <ModalSubTitle>
                                                {subtitle}
                                            </ModalSubTitle>
                                        </FlexDiv>
                                        <CloseButton onClick={close} />
                                    </FlexDiv>
                                    <FlexDiv
                                        justify="space-between"
                                        padding="10px"
                                    >
                                        <ModalTextNo select={true}>
                                            No
                                        </ModalTextNo>
                                        <ModalTextBankName select={true}>
                                            게시글명
                                        </ModalTextBankName>
                                        <ModalTextBankdes select={true}>
                                            본문
                                        </ModalTextBankdes>
                                        <ModalTextBankTime select={true}>
                                            작성일
                                        </ModalTextBankTime>
                                    </FlexDiv>
                                    <hr />
                                    <ListScroll ref={scrollRef}>
                                        {bankpostlist?.map((data, index) => (
                                            <>
                                                <FlexDiv
                                                    key={index}
                                                    justify="space-between"
                                                    padding="10px"
                                                    onClick={() => {
                                                        setModalData(data);
                                                        setModalPostDetail(
                                                            true,
                                                        );
                                                    }}
                                                >
                                                    <ModalTextNo select={true}>
                                                        {data.diaryNo}
                                                    </ModalTextNo>
                                                    <ModalTextBankName
                                                        select={true}
                                                    >
                                                        {data.title}
                                                    </ModalTextBankName>
                                                    <ModalTextBankdes
                                                        select={true}
                                                    >
                                                        {data.content}
                                                    </ModalTextBankdes>
                                                    <ModalTextBankTime
                                                        select={true}
                                                    >
                                                        {data.dateTime}
                                                    </ModalTextBankTime>
                                                </FlexDiv>
                                            </>
                                        ))}
                                    </ListScroll>

                                    {/* <ModalText></ModalText> */}
                                    <ModalButton>
                                        <Button onClick={close}>닫기</Button>
                                    </ModalButton>
                                </ModalPopup>
                            </MainModal>
                        </Section>
                        {modaldata !== null && (
                            <ModaPostOneDetail
                                title="ANGRY SAVING"
                                subtitle="분노 게시글"
                                width="70%"
                                height="80%"
                                open={modalPost}
                                close={() => {
                                    setModalPostDetail(false);
                                    setModalData(0);
                                }}
                                data={modaldata}
                                button1name={'닫기'}
                                is_twobutton
                                button2name={'수정하기'}
                                is_allclosebutton
                            ></ModaPostOneDetail>
                        )}
                    </>
                ) : null}
            </div>
        </>
    );
};

// 스타일 컴포넌트 작성 위치
const Section = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainModal = styled.div`
    position: absolute;
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: ${theme.color.black};
    border-radius: 20px;
`;
const ModalPopup = styled.div`
    height: 100%;
    padding: 20px;
`;
const ModalTitle = styled.div`
    font-family: 'Hanson';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    padding-right: 16px;

    color: #f6f6f6;
`;
const ModalSubTitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;

    color: #f6f6f6;
`;
const ModalText = styled.div`
    height: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Chrome , Safari , Opera */
    }
    white-space: pre-line;
`;

const ModalTextNo = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: ${theme.color.red};
    opacity: ${props => (props.select ? 1 : 0.2)};
    width: 20%;
    text-align: center;
`;
const ModalTextBankName = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    width: 20%;
    text-align: center;
    opacity: ${props => (props.select ? 1 : 0.2)};
`;
const ModalTextBankdes = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    width: 40%;
    text-align: center;
    opacity: ${props => (props.select ? 1 : 0.2)};
`;
const ModalTextBankTime = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    width: 20%;
    text-align: center;
    opacity: ${props => (props.select ? 1 : 0.2)};
`;
const ModalButton = styled.div`
    display: flex;
    position: absolute;
    bottom: 20px;
    width: 97.5%;
`;
const ModalButtonConfirm = styled.div`
    height: 40px;
    width: 50%;
    text-align: center;
    cursor: pointer;
    border: 1px solid #9e9e9e;
`;
const ModalButtonCancel = styled.div`
    height: 40px;
    width: 50%;
    text-align: center;
    cursor: pointer;
    border: 1px solid #9e9e9e;
`;

const ListScroll = styled.div`
    min-height: 40%;
    height: calc(100% - 10rem);
    padding-right: 20px;
    overflow-y: auto;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        //display: none; /* Chrome , Safari , Opera */
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

// default props 작성 위치
ModalImportposttoBank.defaultProps = {
    open: false,
    close: false,
    title: '',
    subtitle: '',
    contents: '',
    _onChange: () => {},
    width: '80%',
    height: '80%',
};

export default ModalImportposttoBank;

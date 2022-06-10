import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, ModalInput } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';

const ModalMakeBank = props => {
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

    return (
        <>
            <div className={open ? 'openModal modal' : 'modal'}>
                {open ? (
                    <Section>
                        <MainModal width={width} height={height}>
                            <ModalPopup>
                                <FlexDiv justify="space-between" padding="10px">
                                    <FlexDiv>
                                        <ModalTitle>{title}</ModalTitle>
                                        <ModalSubTitle>
                                            {subtitle}
                                        </ModalSubTitle>
                                    </FlexDiv>
                                    <CloseButton onClick={close} />
                                </FlexDiv>
                                <FlexDiv justify="flex-start" padding="10px">
                                    <ModalTextTitle>레이아웃1</ModalTextTitle>
                                    <FlexDiv>
                                        <ModalInput placeholder="적금명을 입력하세요." />
                                        <ModalTextTitle>한계치</ModalTextTitle>
                                    </FlexDiv>
                                </FlexDiv>

                                <ModalButton>
                                    <Button margin="10px" onClick={close}>
                                        닫기
                                    </Button>
                                    <Button margin="10px" onClick={close}>
                                        만들기
                                    </Button>
                                </ModalButton>
                            </ModalPopup>
                        </MainModal>
                    </Section>
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
const ModalTextTitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: ${theme.color.white};
    padding-right: 9px;
`;
const ModalTypeingArea = styled.div`
    background-color: orange;
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
ModalMakeBank.defaultProps = {
    open: false,
    close: false,
    title: '',
    subtitle: '',
    contents: '',
    _onChange: () => {},
    width: '80%',
    height: '80%',
};

export default ModalMakeBank;

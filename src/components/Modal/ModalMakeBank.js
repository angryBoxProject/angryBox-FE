import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, ModalInput } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import { setMakeBank } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const scrollRef = useRef();
    const isMount = useIsMount();
    const [name, setName] = useState();
    const [angrylimit, setAngrylimit] = useState();
    const [reward, setReward] = useState();
    const [memo, setMemo] = useState();

    const handleMakeBank = () => {
        const data = {
            name: name,
            angryLimit: parseInt(angrylimit),
            reward: reward,
            memo: memo,
        };
        dispatch(setMakeBank({ data, navigate }));
    };
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
                                <FlexDiv
                                    justify="flex-start"
                                    padding="10px"
                                    width="100%"
                                >
                                    <div
                                        style={{
                                            width: '10%',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ModalTextTitle>적금명</ModalTextTitle>
                                    </div>
                                    <FlexDiv width="90%">
                                        <ModalInput
                                            width="70%"
                                            placeholder="적금명을 입력하세요."
                                            _onChange={e => {
                                                setName(e.target.value);
                                            }}
                                        />
                                        <ModalTextTitle width="10%">
                                            한계치
                                        </ModalTextTitle>
                                        <ModalInput
                                            width="20%"
                                            placeholder="직접 입력"
                                            _onChange={e => {
                                                setAngrylimit(e.target.value);
                                            }}
                                        />
                                    </FlexDiv>
                                </FlexDiv>
                                <FlexDiv
                                    justify="flex-start"
                                    padding="10px"
                                    width="100%"
                                >
                                    <div
                                        style={{
                                            width: '10%',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ModalTextTitle>보상</ModalTextTitle>
                                    </div>
                                    <FlexDiv width="90%">
                                        <ModalInput
                                            width="100%"
                                            placeholder="적금을 깰 때의 보상을 입력하세요. ex) 치킨데이"
                                            _onChange={e => {
                                                setReward(e.target.value);
                                            }}
                                        />
                                    </FlexDiv>
                                </FlexDiv>
                                <FlexDiv
                                    justify="flex-start"
                                    padding="10px"
                                    width="100%"
                                >
                                    <div
                                        style={{
                                            width: '10%',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <ModalTextTitle>메모</ModalTextTitle>
                                    </div>
                                    <FlexDiv width="90%">
                                        <ModalInput
                                            multiLine={true}
                                            width="100%"
                                            placeholder="메모 내용을 입력하세요."
                                            _onChange={e => {
                                                setMemo(e.target.value);
                                            }}
                                        />
                                    </FlexDiv>
                                </FlexDiv>

                                <ModalButton>
                                    <Button margin="10px" onClick={close}>
                                        닫기
                                    </Button>
                                    <Button
                                        margin="10px"
                                        onClick={handleMakeBank}
                                    >
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
    display: flex;
    justify-content: center;

    align-items: center;
    ${props => (props.width ? `width:${props.width};` : '')}
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

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, ModalInput, Select } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import { setMakeBank } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';

import ModalLayout from '../../Layouts/ModalLayout';

const ModalMakeBank = props => {
    const {
        open,
        close,
        modalType,
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
    const [angrylimit, setAngrylimit] = useState(100);
    const [reward, setReward] = useState();
    const [memo, setMemo] = useState();

    const handleMakeBank = () => {
        const data = {
            name: name,
            angryLimit: parseInt(angrylimit),
            reward: reward,
            memo: memo,
        };
        console.log(data);
        dispatch(setMakeBank({ data, navigate }));
    };
    return (
        <ModalLayout modalType={modalType} title={title} close={close}>
            <TitleArea>
                <LabelTitle>적금명</LabelTitle>
                <InputTitle
                    type="text'"
                    placeholder="제목을 입력하세요."
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <LabelTitle>한계치</LabelTitle>
                <Select
                    israge
                    onChange={e => {
                        setAngrylimit(e.target.value);
                    }}
                ></Select>
            </TitleArea>
            <Compensation>
                <LabelTitle>보상</LabelTitle>
                <InputTitle
                    marginRight="0px"
                    type="text'"
                    placeholder="적금을 깰 때의 보상을 입력하세요. ex) 치킨데이"
                    onChange={e => {
                        setReward(e.target.value);
                    }}
                />
            </Compensation>
            <ContentsArea>
                <LabelTitle>메모</LabelTitle>
                <Contents
                    placeholder={'메모 내용을 입력하세요.'}
                    onChange={e => {
                        setMemo(e.target.value);
                    }}
                />
            </ContentsArea>
            <ButtonArea>
                <ModalButtonBlack onClick={close}>취소</ModalButtonBlack>
                <ModalButton onClick={handleMakeBank}>만들기</ModalButton>
            </ButtonArea>
            {/* <div className={open ? 'openModal modal' : 'modal'}>
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
            </div> */}
        </ModalLayout>
    );
};
const TitleArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const LabelTitle = styled.label`
    margin-right: 26px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
    min-width: 50px;
`;
const InputTitle = styled.input`
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
    margin-right: ${props => (props.marginRight ? props.marginRight : '27px')};
    padding: 6px 20px 8px;
    border: 1px solid #282828;
    background: #f6f6f6;

    &::placeholder {
        color: #737373;
    }

    &:focus {
        background: #fff;
    }
`;
const Compensation = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 47px;
`;
const ContentsArea = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    margin-bottom: 28px;
`;
const Contents = styled.textarea`
    width: 100%;
    padding: 10px;
    background: #f6f6f6;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    color: #737373;
    border: solid 1px #282828;
    padding: 20px;

    &:focus {
        background: #fff;
    }
`;
const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ModalButtonBlack = styled.button`
    cursor: pointer;
    width: 100%;
    max-width: 440px;
    height: 44px;
    background: #282828;
    border-radius: 22px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #f6f6f6;
    margin-right: 26px;
`;
const ModalButton = styled.button`
    cursor: pointer;
    width: 100%;
    max-width: 440px;
    height: 44px;
    border: solid 3px #813bf3;
    border-radius: 22px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
    display: block;

    &:disabled {
        opacity: 0.5;
    }
`;

export default ModalMakeBank;

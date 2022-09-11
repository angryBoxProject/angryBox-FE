import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Select } from '../../elements';
import { useDispatch } from 'react-redux';
import { setEditBank, setMakeBank } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';

import ModalLayout from '../../Layouts/ModalLayout';

const ModalMakeBank = props => {
    const { open, close, modalType, title, editBank } = props;

    console.log(editBank ?? 'test');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [angrylimit, setAngrylimit] = useState(100);
    const [reward, setReward] = useState();
    const [memo, setMemo] = useState();

    const handleMakeBank = () => {
        if (editBank) {
            const data = {
                id: editBank?.id,
                name: name,
                angryLimit: parseInt(angrylimit),
                reward: reward,
                memo: memo,
            };

            console.log(data);
            dispatch(setEditBank({ data, navigate }));
        } else {
            const data = {
                name: name,
                angryLimit: parseInt(angrylimit),
                reward: reward,
                memo: memo,
            };
            console.log(data);

            dispatch(setMakeBank({ data, navigate }));
        }
    };

    useEffect(() => {
        if (editBank) {
            setName(editBank?.name);
            setAngrylimit(editBank?.angryLimit);
            setReward(editBank?.reward);
            setMemo(editBank?.memo);
        }
        //적금수정 초기값 받아올때 사용해야함
    }, [editBank]);
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
                    value={name}
                />
                <LabelTitle>한계치</LabelTitle>
                <Select
                    israge
                    onChange={e => {
                        setAngrylimit(e.target.value);
                    }}
                    value={angrylimit}
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
                    value={reward}
                />
            </Compensation>
            <ContentsArea>
                <LabelTitle>메모</LabelTitle>
                <Contents
                    placeholder={'메모 내용을 입력하세요.'}
                    onChange={e => {
                        setMemo(e.target.value);
                    }}
                    value={memo}
                />
            </ContentsArea>
            <ButtonArea>
                <ModalButtonBlack onClick={close}>취소</ModalButtonBlack>
                <ModalButton onClick={handleMakeBank}>
                    {editBank ? '수정하기' : '만들기'}
                </ModalButton>
            </ButtonArea>
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

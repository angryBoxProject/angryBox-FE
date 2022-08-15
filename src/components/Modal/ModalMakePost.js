import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, ModalInput, Select } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import { ReactComponent as ImageIcon } from '../../static/image/modal/image.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import { setMakePost } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';

import ModalLayout from '../../Layouts/ModalLayout';

const ModalMakePost = props => {
    const { close, title, modalType } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollRef = useRef();
    const isMount = useIsMount();
    const [name, setName] = useState();
    const [modalstatelinterim, Setmodallinterim] = useState(false);
    const [angryPhase, setAngryPhase] = useState('극소노');
    const [ispublic, setIspublic] = useState('비공개');
    const [memo, setMemo] = useState();
    const [image, setImage] = useState();

    const ismember = useSelector(state => state.member.user_info).memberId;
    let memberId = 0;
    if (ismember)
        memberId = useSelector(state => state.member.user_info).memberId;
    const handleMakePost = () => {
        let publiccount = false;
        const angrystate = [
            '',
            '극소노',
            '소노',
            '중노',
            '대노',
            '극대노',
        ].findIndex(e => e === angryPhase);
        if (['비공개', '공개글'].findIndex(e => e === ispublic)) {
            publiccount = true;
        }

        const data = {
            title: name,
            content: memo,
            angryPhaseId: angrystate,
            interimId: 0,
            publiccount: publiccount,
            files: image,
        };

        dispatch(setMakePost({ data, navigate }));
    };
    const handleMakelinterim = () => {
        let publiccount = false;
        const angrystate = [
            '',
            '극소노',
            '소노',
            '중노',
            '대노',
            '극대노',
        ].findIndex(e => e === angryPhase);
        if (['비공개', '공개글'].findIndex(e => e === ispublic)) {
            publiccount = true;
        }

        const data = {
            title: name,
            content: memo,
            angryPhaseId: angrystate,
            interimId: 0,
            publiccount: publiccount,
        };

        dispatch(setMakePost({ data, navigate }));
    };

    const handleFileInput = e => {
        const files = e.target.files;
        setImage(e.target.files);
        console.log(files);
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        console.log(formData);
        // const data = { files, planId };
        // dispatch(setUploadImage(data));
        // dispatch(getImage(planId));
        // dispatch(getOnePlan(planId));
    };
    return (
        <ModalLayout modalType={modalType} title={title} close={close}>
            <TitleArea>
                <InputTitle
                    type="text'"
                    placeholder="제목을 입력하세요."
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <ImageButton>
                    <Pointer>
                        <ImageIcon />
                    </Pointer>
                    <FileInput
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileInput}
                    />
                </ImageButton>
                <Select
                    ispublic
                    onChange={e => {
                        setIspublic(e.target.value);
                    }}
                ></Select>
                <Select
                    onChange={e => {
                        setAngryPhase(e.target.value);
                    }}
                />
            </TitleArea>
            <ContentsArea>
                {image && <UploadImage>이미지 노출 영역</UploadImage>}
                <Contents
                    placeholder={
                        '본문 내용을 입력하세요.\n타인을 비방하거나 욕설이 포함된 게시글의 경우 게시판 이용에 제한이 있을 수 있습니다.'
                    }
                    onChange={e => {
                        setMemo(e.target.value);
                    }}
                />
            </ContentsArea>
            <ModalButton onClick={handleMakePost} disabled={!name}>
                완료
            </ModalButton>
        </ModalLayout>
    );
};

const TitleArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
`;
const InputTitle = styled.input`
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
    margin-right: 13px;
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
const ImageButton = styled.div`
    width: 262px;
    position: relative;
`;
const Pointer = styled.div`
    cursor: pointer;
`;
const ContentsArea = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    border: solid 1px #282828;
    padding: 10px;
    margin-bottom: 28px;
`;
const UploadImage = styled.div`
    width: 673px;
    min-width: 673px;
    padding: 10px;
    height: 100%;
    border-right: solid 1px #282828;
    margin-right: 10px;
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

    &:focus {
        background: #fff;
    }
`;
const ModalButton = styled.button`
    cursor: pointer;
    width: 100%;
    max-width: 440px;
    height: 44px;
    border: solid 3px #813bf3;
    border-radius: 22px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
    display: block;

    &:disabled {
        opacity: 0.5;
    }
`;
const FileInput = styled.input`
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50px;
    font-size: 45px;
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;

    filter: alpha(opacity=0);
    -ms-filter: 'alpha(opacity=0)';
    -khtml-opacity: 0;
    -moz-opacity: 0;
`;

export default ModalMakePost;

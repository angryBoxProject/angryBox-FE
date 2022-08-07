import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Select, SwipeableTextMobileStepper } from '../../elements';
import ModalLayout from '../../Layouts/ModalLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, setEditPost, setMakePost } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';
import { usePostDetail } from '../../hooks/usePostDetail';
import useIsMount from '../../hooks/useIsMount';

import { ReactComponent as ImageIcon } from '../../static/image/modal/image.svg';
import { tokenURL } from '../../Apis/API';

const ModalPostDetail = props => {
    const { id, close, title, modalType, status, setStatus } = props;

    const { data: detailList, error, isFetching, refetch } = usePostDetail(id);

    const [name, setName] = useState();
    const [memo, setMemo] = useState();
    const [image, setImage] = useState();
    const [showimage, setShowImage] = useState();
    const [angryPhase, setAngryPhase] = useState('극소노');
    const [ispublic, setIspublic] = useState('비공개');
    const isMount = useIsMount();
    const list = ['', '극소노', '소노', '중노', '대노', '극대노'];
    const navigate = useNavigate();

    const mymemberID =
        parseInt(localStorage.getItem('memberId')) ===
        detailList?.diary?.memberId;

    const handleAngryState = v => {
        // const list = ['', '극소노', '소노', '중노', '대노', '극대노'];
        // const list = ['', '', '', '중노', '', ''];
        return list[v];
    };
    const handlePublic = v => {
        // const publ = detailList.diary.public;
        return v ? '공개글' : '비공개';
    };
    useEffect(() => {
        if (detailList?.fileList) {
            setImage(detailList?.fileList.length);
            setShowImage(detailList?.fileList);
        }
    }, [detailList]);

    useEffect(() => {
        if (detailList && isMount.current) {
            setName(detailList.diary.title);
            setAngryPhase(list[detailList.diary.angryPhaseId]);
            setIspublic(detailList.diary.public);
            setMemo(detailList.diary.content);
        }
    }, [detailList, isMount]);
    const deletehandle = async () => {
        try {
            await tokenURL.delete(`/diaries/${detailList?.diary?.id}`);
            navigate('/new/main', { replace: true });
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    console.log('abababab', detailList);
    return (
        <ModalLayout modalType={modalType} title={title} close={close}>
            <TitleArea>
                <InputTitle
                    type="text'"
                    placeholder="제목을 입력하세요."
                    value={name || ''}
                    onChange={e => {}}
                />

                {/* 조건에 맞게 토닥 수 노출여부 변경 v*/}
                <TodacCount>
                    토닥 수 {`${detailList?.diary?.todackCount}`}
                </TodacCount>
                <OpenStatus>
                    {handlePublic(detailList?.diary?.public)}
                </OpenStatus>
                <FireStatus>
                    {handleAngryState(detailList?.diary?.angryPhaseId)}
                </FireStatus>
            </TitleArea>
            <ContentsArea>
                {image ? (
                    <UploadImage>
                        <SwipeableTextMobileStepper images={showimage} />
                    </UploadImage>
                ) : (
                    <></>
                )}

                <Contents
                    placeholder={
                        '본문 내용을 입력하세요.\n타인을 비방하거나 욕설이 포함된 게시글의 경우 게시판 이용에 제한이 있을 수 있습니다.'
                    }
                    value={memo || ''}
                    onChange={e => {}}
                />
            </ContentsArea>

            {/* 조건에 맞게 버튼 노출여부 변경 v*/}
            <ButtonArea>
                {mymemberID && (
                    <>
                        <ModalButtonBlack
                            onClick={deletehandle}
                            disabled={!name}
                        >
                            삭제
                        </ModalButtonBlack>
                        <ModalButtonBlack onClick={close} disabled={!name}>
                            수정
                        </ModalButtonBlack>
                    </>
                )}
                <ModalButton onClick={close} disabled={!name}>
                    닫기
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
    margin-bottom: 25px;
`;
const InputTitle = styled.input`
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
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
const TodacCount = styled.div`
    min-width: 140px;
    height: 44px;
    border: solid 1px #282828;
    text-align: center;
    padding: 9px 0;
    margin-left: 26px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
`;
const OpenStatus = styled.div`
    min-width: 140px;
    height: 44px;
    border: solid 1px #282828;
    text-align: center;
    padding: 9px 0;
    margin-left: 26px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
`;
const FireStatus = styled.div`
    min-width: 140px;
    height: 44px;
    border: solid 1px #282828;
    text-align: center;
    padding: 9px 0;
    margin-left: 26px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
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
    width: 400px;
    min-width: 400px;
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
const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ModalButtonBlack = styled.button`
    cursor: pointer;
    width: 100%;
    max-width: 210px;
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
export default ModalPostDetail;

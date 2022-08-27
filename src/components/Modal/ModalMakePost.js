import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
    FlexDiv,
    ModalInput,
    Select,
    SwipeableTextMobileStepper,
} from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import { ReactComponent as ImageIcon } from '../../static/image/modal/image.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import { setEditPost, setMakePost } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';

import ModalLayout from '../../Layouts/ModalLayout';

const ModalMakePost = props => {
    const { close, title, modalType, editPostlist } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollRef = useRef();
    const isMount = useIsMount();
    const [name, setName] = useState();
    const [modalstatelinterim, Setmodallinterim] = useState(false);
    const [angryPhase, setAngryPhase] = useState('극소노');
    const [ispublic, setIspublic] = useState('비공개');
    const [memo, setMemo] = useState();
    const [image, setImage] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);
    const [isflag, setFlag] = useState(false);
    const [removedFileId, setRemovedFileId] = useState([]);

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
            removedFileId: removedFileId,
            id: editPostlist?.diary?.id,
        };

        if (editPostlist) dispatch(setEditPost({ data, navigate }));
        else dispatch(setMakePost({ data, navigate }));
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

        const readAndPreview = file => {
            const reader = new FileReader();
            console.log(file, 'file');
            reader.onload = () => {
                const data = {
                    fileLink: reader.result,
                    fileId: file.lastModified,
                };
                setImageUrl(prev => [...prev, data]);
            };
            reader.readAsDataURL(file);
        };
        if (files) {
            [].forEach.call(files, readAndPreview);
        }

        setImage(e.target.files);
        setFlag(true);

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
    };

    console.log(editPostlist, 'editPostlist');
    console.log(
        'name::',
        editPostlist?.diary?.title,
        ' Memo::',
        editPostlist?.diary?.content,
        ' Image::',
        editPostlist?.fileList,
        ' 분노수치::',
        editPostlist?.diary?.angryPhaseId,
        ' ::공개 여부',
        editPostlist?.diary?.public,
    );
    useEffect(() => {
        if (editPostlist) {
            const angrystate = ['', '극소노', '소노', '중노', '대노', '극대노'];
            const publicstate = ['비공개', '공개글'];
            const publiccount = editPostlist?.diary?.public === true ? 1 : 0;
            setAngryPhase(angrystate[editPostlist?.diary?.angryPhaseId]);
            setIspublic(publicstate[publiccount]);
            setName(editPostlist?.diary?.title);
            setMemo(editPostlist?.diary?.content);
            setImage(editPostlist?.fileList);
            editPostlist?.fileList.map(item => {
                setRemovedFileId(prev => [...prev, item?.fileId]);
            });

            console.log('test');
        }
    }, [editPostlist]);
    console.log(angryPhase, image, 'angryPhase,image');
    return (
        <ModalLayout modalType={modalType} title={title} close={close}>
            <TitleArea>
                <InputTitle
                    type="text'"
                    placeholder="제목을 입력하세요."
                    onChange={e => {
                        setName(e.target.value);
                    }}
                    value={name}
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
                    value={ispublic}
                ></Select>
                <Select
                    onChange={e => {
                        setAngryPhase(e.target.value);
                    }}
                    value={angryPhase}
                />
            </TitleArea>
            <ContentsArea>
                {image &&
                    image?.length !== 0 &&
                    (console.log('asdf', image),
                    (
                        <UploadImage>
                            {editPostlist ? (
                                <div>
                                    {isflag ? (
                                        <SwipeableTextMobileStepper
                                            images={imageUrl}
                                            ismake={true}
                                        />
                                    ) : (
                                        <SwipeableTextMobileStepper
                                            images={image}
                                            ismake={false}
                                        />
                                    )}
                                </div>
                            ) : (
                                <SwipeableTextMobileStepper
                                    images={imageUrl}
                                    ismake={true}
                                />
                            )}
                        </UploadImage>
                    ))}
                <Contents
                    placeholder={
                        '본문 내용을 입력하세요.\n타인을 비방하거나 욕설이 포함된 게시글의 경우 게시판 이용에 제한이 있을 수 있습니다.'
                    }
                    onChange={e => {
                        setMemo(e.target.value);
                    }}
                    value={memo}
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
    min-width: 273px;
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

const TestImage = styled.div`
    background-image: url('${props => props.src}');
`;
export default ModalMakePost;

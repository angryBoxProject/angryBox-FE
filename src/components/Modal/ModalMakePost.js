import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, ModalInput, Select } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import { ReactComponent as UploadImage } from '../../static/image/UploadImage.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import { setMakePost } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';
import ModalLinterimList from './ModalLinterimList';

const ModalMakePost = props => {
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
        coinBankId,
    } = props;

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
                                    <FlexDiv width="100%">
                                        <ModalInput
                                            width="100%"
                                            placeholder="제목을 입력하세요."
                                            _onChange={e => {
                                                setName(e.target.value);
                                            }}
                                        />
                                        <UploadImageButton>
                                            <UploadImage
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                            <FileInput
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleFileInput}
                                            />
                                        </UploadImageButton>
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
                                    </FlexDiv>
                                </FlexDiv>
                                <FlexDiv
                                    justify="flex-start"
                                    padding="10px"
                                    width="100%"
                                ></FlexDiv>
                                <FlexDiv
                                    justify="flex-start"
                                    padding="10px"
                                    width="100%"
                                >
                                    <FlexDiv width="100%">
                                        <ModalInput
                                            row={18}
                                            multiLine={true}
                                            width="100%"
                                            placeholder="본문 내용을 입력하세요.."
                                            _onChange={e => {
                                                setMemo(e.target.value);
                                            }}
                                        />
                                    </FlexDiv>
                                </FlexDiv>

                                <ModalButton>
                                    {/* <Button
                                        is_white
                                        margin="10px"
                                        onClick={() => {
                                            console.log('임시저장');
                                        }}
                                    >
                                        임시저장하기
                                    </Button>
                                    <Button
                                        is_white
                                        margin="10px"
                                        onClick={() => {
                                            console.log('임시저장불러오기');
                                            Setmodallinterim(true);
                                        }}
                                    >
                                        임시저장불러오기
                                    </Button> */}
                                    <Button
                                        margin="10px"
                                        onClick={handleMakePost}
                                    >
                                        완료
                                    </Button>
                                </ModalButton>
                            </ModalPopup>
                        </MainModal>
                        <ModalLinterimList
                            title="IMPORT FILE"
                            subtitle="게시글 불러오기"
                            width="50%"
                            height="50%"
                            open={modalstatelinterim}
                            close={() => {
                                Setmodallinterim(false);
                            }}
                            listclick={() => {
                                SetmodalPost(true);
                            }}
                        />
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
const UploadImageButton = styled.div`
    margin: 10px;
    padding: 10px;
    display: flex;
    position: relative;
`;

const FileInput = styled.input`
    width: 54px;
    height: 54px;
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
ModalMakePost.defaultProps = {
    open: false,
    close: false,
    title: '',
    subtitle: '',
    contents: '',
    _onChange: () => {},
    width: '80%',
    height: '80%',
};

export default ModalMakePost;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, ModalInput, Select } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import { getPost, setMakePost } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';
import { usePostDetail } from '../../hooks/usePostDetail';

const ModaPostDetail = props => {
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
        data,
        is_twobutton,
        button1name,
        button2name,
        is_allclosebutton,
        button2onClick,
    } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollRef = useRef();
    const isMount = useIsMount();
    const ismember = useSelector(state => state.member.user_info).memberId;
    let memberId = 0;
    if (ismember)
        memberId = useSelector(state => state.member.user_info).memberId;
    const [edit, setEdit] = useState();
    const {
        status,
        data: detailList,
        error,
        isFetching,
        refetch,
    } = usePostDetail(data.id);
    console.log(detailList);
    const list = ['극대노', '대노', '중노', '소노', '극소노'];
    const [name, setName] = useState(detailList.diary.title);
    const [angryPhase, setAngryPhase] = useState(
        list[detailList.diary.angryPhaseId],
    );
    const [ispublic, setIspublic] = useState(detailList.diary.public);
    const [memo, setMemo] = useState(detailList.diary.content);
    const handlePublic = v => {
        // const publ = detailList.diary.public;
        return v ? '공개글' : '비공개';
    };

    const datas = {
        angryPhaseId: 4,
        coinBankId: 2,
        content: 'content자동',
        dailyTopId: 0,
        dateTime: '2022-07-02 08:40:00',
        deleted: false,
        diaryNo: 3768,
        id: 5057,
        memberId: 1,
        public: true,
        title: 'title자동',
        todackCount: 0,
        todayTopId: 0,
        viewCount: 4846,
        diary: 'adfasdf',
    };
    const handleMakePost = () => {
        console.log('수정하기');
        setEdit(!edit);
        return;
        let publiccount = false;
        const angrystate = [
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
        console.log(data);

        dispatch(setMakePost({ data, navigate }));
    };
    return (
        <>
            {detailList && (
                <div className={open ? 'openModal modal' : 'modal'}>
                    {open ? (
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
                                        justify="flex-start"
                                        padding="10px"
                                        width="100%"
                                    >
                                        <FlexDiv width="100%">
                                            {edit ? (
                                                <ModalInput
                                                    width="100%"
                                                    placeholder="제목을 입력하세요."
                                                    _onChange={e => {
                                                        setName(e.target.value);
                                                    }}
                                                    value={name}
                                                ></ModalInput>
                                            ) : (
                                                <ModalDetailTitle>
                                                    {name}
                                                </ModalDetailTitle>
                                            )}
                                            <ModalDetailBox width="25%">
                                                <p
                                                    style={{
                                                        color: `${theme.color.white}`,
                                                    }}
                                                >
                                                    토닥 수
                                                </p>
                                                {detailList.diary.todackCount}
                                            </ModalDetailBox>
                                            {edit ? (
                                                <>
                                                    <Select
                                                        ispublic
                                                        onChange={e => {
                                                            setIspublic(
                                                                e.target.value,
                                                            );
                                                        }}
                                                    ></Select>
                                                    <Select
                                                        onChange={e => {
                                                            setAngryPhase(
                                                                e.target.value,
                                                            );
                                                            console.log(
                                                                e.target.value,
                                                            );
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <ModalDetailBox width="20%">
                                                        {handlePublic(ispublic)}
                                                    </ModalDetailBox>
                                                    <ModalDetailBox width="20%">
                                                        {angryPhase}
                                                    </ModalDetailBox>
                                                </>
                                            )}
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
                                            {edit ? (
                                                <ModalInput
                                                    row={18}
                                                    multiLine={true}
                                                    width="100%"
                                                    placeholder="본문 내용을 입력하세요.."
                                                    _onChange={e => {
                                                        setMemo(e.target.value);
                                                    }}
                                                    value={memo}
                                                />
                                            ) : (
                                                <ModalDetailContentOutLine>
                                                    <ModalDetailContent>
                                                        {memo}
                                                    </ModalDetailContent>
                                                </ModalDetailContentOutLine>
                                            )}
                                        </FlexDiv>
                                    </FlexDiv>

                                    <ModalButton>
                                        {is_allclosebutton ? (
                                            <Button
                                                margin="10px"
                                                onClick={close}
                                            >
                                                {props.button1name}
                                            </Button>
                                        ) : (
                                            <>
                                                <div
                                                    style={{
                                                        width: '50%',
                                                        marginRight: '30px',
                                                    }}
                                                >
                                                    {is_twobutton ? (
                                                        <Button
                                                            is_white
                                                            margin="10px"
                                                            onClick={e => {
                                                                if (!edit) {
                                                                    setEdit(
                                                                        !edit,
                                                                    );
                                                                } else
                                                                    handleMakePost();
                                                            }}
                                                        >
                                                            {props.button2name}
                                                        </Button>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        ></div>
                                                    )}
                                                </div>
                                                <div
                                                    style={{
                                                        width: '50%',
                                                        marginRight: '30px',
                                                    }}
                                                >
                                                    <Button
                                                        margin="10px"
                                                        onClick={close}
                                                    >
                                                        {props.button1name}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </ModalButton>
                                </ModalPopup>
                            </MainModal>
                        </Section>
                    ) : null}
                </div>
            )}
        </>
    );
};

// 스타일 컴포넌트 작성 위치
const Section = styled.div`
    position: fixed;
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
const ModalDetailTitle = styled.p`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height */

    width: 100%;
    padding: 13px;
    margin-right: 21px;
    box-sizing: border-box;
    background: #2e2e2e;
    border-bottom: 1px solid #f6f6f6;
    height: 60px;
    color: #f6f6f6;
`;
const ModalDetailBox = styled.p`
    width: ${props => props.width};
    margin: 10px;
    border: 1px solid #f6f6f6;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.color.red};
`;
const ModalDetailContentOutLine = styled.div`
    color: #f6f6f6;
    border: 1px solid #f6f6f6;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 20px;
    height: 50vh;
    width: 100%;
`;
const ModalDetailContent = styled.p`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
`;
const ModalButton = styled.div`
    display: flex;
    position: absolute;
    bottom: 20px;
    width: 97.5%;
    justify-content: space-between;
`;

// default props 작성 위치
ModaPostDetail.defaultProps = {
    open: false,
    close: false,
    title: '',
    subtitle: '',
    contents: '',
    _onChange: () => {},
    width: '80%',
    height: '80%',
};

export default ModaPostDetail;

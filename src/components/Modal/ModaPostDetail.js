import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
    FlexDiv,
    ModalInput,
    Select,
    SwipeableTextMobileStepper,
    SwiperImage,
} from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import { getPost, setEditPost, setMakePost } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';
import { usePostDetail } from '../../hooks/usePostDetail';
import { data } from 'autoprefixer';
import { tokenURL } from '../../Apis/API';

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

    const ismy = data?.memberId === ismember;

    // let memberId = 0;
    // if (ismember)
    //     memberId = useSelector(state => state.member.user_info).memberId;
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState();
    const {
        status,
        data: detailList,
        error,
        isFetching,
        refetch,
    } = usePostDetail(data.id);
    const [imagelist, setImagelist] = useState('adsf');
    console.log(detailList);
    // let imagelist = null;
    // if (status === 'success') {
    //     // console.log(Object.keys(detailList));
    //     if (Object.keys(detailList)?.length > 1) {
    //         for (let i = 1; i < Object.keys(detailList)?.length; i++) {
    //             console.log(Object.keys(detailList)[i]);
    //             console.log(Object.values(detailList)[i]?.fileLink);
    //             setImagelist([
    //                 ...imagelist,
    //                 Object.values(detailList)[i]?.fileLink,
    //             ]);
    //         }
    //     }
    // }

    useEffect(() => {
        if (status === 'success') {
            // console.log(Object.keys(detailList));
            if (Object.keys(detailList)?.length > 1) {
                for (let i = 1; i < Object.keys(detailList)?.length; i++) {
                    console.log(Object.keys(detailList)[i]);
                    console.log(Object.values(detailList)[i]?.fileLink);
                    setImagelist(
                        ...imagelist,
                        Object.values(detailList)[i]?.fileLink,
                    );
                }
            }
        }
    }, [open]);
    // console.log(imagelist);
    // useEffect(() => {
    //     if (status === 'success') {
    //         // console.log(Object.keys(detailList));
    //         if (Object.keys(detailList)?.length > 1) {
    //             for (let i = 1; i < Object.keys(detailList)?.length; i++) {
    //                 console.log(Object.keys(detailList)[i]);
    //                 console.log(Object.values(detailList)[i]?.fileLink);
    //                 setImagelist(prev => [
    //                     ...prev,
    //                     Object.values(detailList)[i]?.fileLink,
    //                 ]);
    //             }
    //         }
    //     }
    // }, [detailList]);
    console.log(imagelist);
    const list = ['', '극소노', '소노', '중노', '대노', '극대노'];
    const [angryPhase, setAngryPhase] = useState('극소노');
    // const [ispublic, setIspublic] = useState(detailList.diary.public);
    // const [memo, setMemo] = useState(detailList.diary.content);
    const [ispublic, setIspublic] = useState('비공개');
    const [memo, setMemo] = useState();
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
        if (detailList && isMount.current) {
            setName(detailList.diary.title);
            setAngryPhase(list[detailList.diary.angryPhaseId]);
            setIspublic(detailList.diary.public);
            setMemo(detailList.diary.content);
        }
    }, [detailList, isMount]);
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

        const newdata = {
            title: name,
            content: memo,
            angryPhaseId: angrystate,
            interimId: 0,
            publiccount: publiccount,
            id: data.id,
            removeFileId: [],
            file: null,
        };
        // dispatch();
        dispatch(setEditPost({ newdata, navigate })).then(res => {
            return refetch();
        });

        setEdit(!edit);
    };
    const tokackhandle = async () => {
        try {
            await tokenURL.post(`/todack/${data.id}`, null);
        } catch (error) {
            await tokenURL.delete(`/todack/${data.id}`);
        }
        refetch();
    };

    const renderByStatus = useCallback(() => {
        switch (status) {
            case 'loading':
                return null;
            case 'error':
                if (error instanceof Error) {
                    return <span>Error: {error.message}</span>;
                }
                break;
            default:
                return (
                    <>
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
                                                    <ModalTitle>
                                                        {title}
                                                    </ModalTitle>
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
                                                                setName(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            }}
                                                        ></ModalInput>
                                                    ) : (
                                                        <ModalDetailTitle>
                                                            {
                                                                detailList.diary
                                                                    .title
                                                            }
                                                        </ModalDetailTitle>
                                                    )}
                                                    {ismy ? (
                                                        <ModalDetailBox width="25%">
                                                            <p
                                                                style={{
                                                                    color: `${theme.color.white}`,
                                                                }}
                                                            >
                                                                토닥 수
                                                            </p>
                                                            {
                                                                detailList.diary
                                                                    .todackCount
                                                            }
                                                        </ModalDetailBox>
                                                    ) : (
                                                        <Button
                                                            width="25%"
                                                            onClick={() => {
                                                                tokackhandle();
                                                            }}
                                                        >
                                                            토닥{' '}
                                                            {
                                                                detailList.diary
                                                                    .todackCount
                                                            }
                                                        </Button>
                                                    )}
                                                    {edit ? (
                                                        <>
                                                            <Select
                                                                ispublic
                                                                onChange={e => {
                                                                    setIspublic(
                                                                        e.target
                                                                            .value,
                                                                    );
                                                                }}
                                                            ></Select>
                                                            <Select
                                                                onChange={e => {
                                                                    setAngryPhase(
                                                                        e.target
                                                                            .value,
                                                                    );
                                                                }}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ModalDetailBox width="20%">
                                                                {handlePublic(
                                                                    detailList
                                                                        .diary
                                                                        .public,
                                                                )}
                                                            </ModalDetailBox>
                                                            <ModalDetailBox width="20%">
                                                                {handleAngryState(
                                                                    detailList
                                                                        .diary
                                                                        .angryPhaseId,
                                                                )}
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
                                            <div>test</div>
                                            {detailList.fileList && (
                                                <SwipeableTextMobileStepper
                                                    images={detailList.fileList}
                                                />
                                            )}
                                            {Object.values(detailList)?.map(
                                                (data, index) => (
                                                    <>
                                                        {data?.fileLink && (
                                                            <>
                                                                {/* <ImageView
                                                                    bgImg={`url(${
                                                                        process
                                                                            .env
                                                                            .REACT_APP_IP +
                                                                        data?.fileLink
                                                                    })`}
                                                                ></ImageView> */}
                                                                {/* <SwipeableTextMobileStepper></SwipeableTextMobileStepper> */}
                                                            </>
                                                        )}
                                                    </>
                                                ),
                                            )}

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
                                                                setMemo(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            }}
                                                        />
                                                    ) : (
                                                        <ModalDetailContentOutLine>
                                                            <ModalDetailContent>
                                                                {
                                                                    detailList
                                                                        .diary
                                                                        .content
                                                                }
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
                                                                marginRight:
                                                                    '30px',
                                                            }}
                                                        >
                                                            {is_twobutton ? (
                                                                ismember ===
                                                                    data.memberId && (
                                                                    <Button
                                                                        is_white
                                                                        margin="10px"
                                                                        onClick={e => {
                                                                            if (
                                                                                !edit
                                                                            ) {
                                                                                setEdit(
                                                                                    !edit,
                                                                                );
                                                                            } else
                                                                                handleMakePost();
                                                                        }}
                                                                    >
                                                                        {
                                                                            props.button2name
                                                                        }
                                                                    </Button>
                                                                )
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
                                                                marginRight:
                                                                    '30px',
                                                            }}
                                                        >
                                                            <Button
                                                                margin="10px"
                                                                onClick={close}
                                                            >
                                                                {
                                                                    props.button1name
                                                                }
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
                    </>
                );
        }
    }, [
        status,
        isFetching,
        open,
        close,
        edit,
        name,
        memo,
        angryPhase,
        ispublic,
    ]);
    return <>{renderByStatus()}</>;
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
const ModalDetailBox = styled.div`
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
const ModalDetailContent = styled.div`
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
const ImageView = styled.div`
    background-image: ${props => props.bgImg};
    background-size: cover;
    width: 100%;
    height: 100%;
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
    data: {
        id: 0,
    },
};

export default ModaPostDetail;

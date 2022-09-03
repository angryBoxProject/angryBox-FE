import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainLayout from '../../../Layouts/MainLayout';
import Contents from '../../../Layouts/Contents';

import { useInView } from 'react-intersection-observer';
import { tokenURL } from '../../../Apis/API';
import ModalPostDetail from '../../../components/Modal/ModalPostDetail';

import { ReactComponent as CameraIcon } from '../../../static/image/community/camera.svg';
import { ReactComponent as HandIcon } from '../../../static/image/community/hand.svg';
import { ReactComponent as ViewIcon } from '../../../static/image/community/view.svg';
import { ReactComponent as FilterArrow } from '../../../static/image/community/filter_arrow.svg';

const gallerysList = [
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
];

const optionItems = ['필터적용', '필터1', '필터2', '필터3'];

const Gallery = props => {
    const [select, setSelect] = useState(false);
    const [option, setOption] = useState('필터적용');
    const navigate = useNavigate();

    const [ref, inView] = useInView();
    const [galleryList, setGalleryList] = useState([]);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('view');

    const [modalPost, setModalPost] = useState();

    const getList = useCallback(async () => {
        console.log(galleryList);
        setLoading(true);
        const data = {
            startDate: '',
            endDate: '',
            imageFilter: 2,
            angry: [],
        };
        // await tokenURL.get(`/diaries/todayTop/${lastId}/5`).then(res => {
        await tokenURL
            .get(`/gallery?lastDiaryId=${lastId}&size=10`)
            .then(res => {
                const list = res.data.data.list;
                // const list = res.data.data.todayTopDiary;
                setGalleryList(prevState => [...prevState, ...list]);
            });
        setLoading(false);
    }, [lastId]);

    useEffect(() => {
        getList();
    }, [getList]);

    useEffect(() => {
        if (inView && !loading) {
            setLastId(prevState => prevState + 10);
        }
    }, [inView, loading]);

    return (
        <MainLayout nav={true}>
            <Contents header={true}>
                <TablelistWrap>
                    {/* 실시간 Best */}
                    <TablelistGallery>
                        <TableHead>
                            <Title>
                                <CameraIcon />
                                <Text>갤러리</Text>
                            </Title>
                            {/* <FilterWrap onClick={() => setSelect(!select)}>
                                {option}

                                <Arrow
                                    style={{
                                        transform: select
                                            ? 'rotate(180deg) translate(0, 50%)'
                                            : '',
                                    }}
                                >
                                    <FilterArrow />
                                </Arrow>
                                {select && (
                                    <OptionWarp>
                                        {optionItems.map((option, key) => {
                                            return (
                                                <OptionItem
                                                    key={key}
                                                    onClick={() =>
                                                        setOption(option)
                                                    }
                                                >
                                                    {option}
                                                </OptionItem>
                                            );
                                        })}
                                    </OptionWarp>
                                )}
                            </FilterWrap> */}
                        </TableHead>
                        <TableBody>
                            {galleryList.map((item, key) => (
                                <React.Fragment key={key}>
                                    {galleryList.length - 1 == key ? (
                                        <ImageItem
                                            ref={ref}
                                            onClick={() => {
                                                setModalPost(item?.id);
                                            }}
                                            bgImg={
                                                item
                                                    ? `url(${
                                                          process.env
                                                              .REACT_APP_IP +
                                                          item.file
                                                      })`
                                                    : 'none'
                                            }
                                        >
                                            <ImageItemContent>
                                                <ImageItemTitle>
                                                    {item.title}
                                                </ImageItemTitle>
                                                <ImageItemInfoWrap>
                                                    <HandWrap>
                                                        <HandIcon />
                                                        <HandValue>
                                                            {item.todack_count}
                                                        </HandValue>
                                                    </HandWrap>
                                                    {/* <ViewWrap>
                                                        <ViewIcon />
                                                        <ViewValue>
                                                            {item.hand}
                                                        </ViewValue>
                                                    </ViewWrap> */}
                                                </ImageItemInfoWrap>
                                            </ImageItemContent>
                                            {/* <Detail>{item.content}</Detail> */}
                                        </ImageItem>
                                    ) : (
                                        <ImageItem
                                            onClick={() => {
                                                setModalPost(item?.id);
                                            }}
                                            bgImg={
                                                item
                                                    ? `url(${
                                                          process.env
                                                              .REACT_APP_IP +
                                                          item.file
                                                      })`
                                                    : 'none'
                                            }
                                        >
                                            <ImageItemContent>
                                                <ImageItemTitle>
                                                    {item.title}
                                                </ImageItemTitle>
                                                <ImageItemInfoWrap>
                                                    <HandWrap>
                                                        <HandIcon />
                                                        <HandValue>
                                                            {item.todack_count}
                                                        </HandValue>
                                                    </HandWrap>
                                                    {/* <ViewWrap>
                                                        <ViewIcon />
                                                        <ViewValue>
                                                            {item.hand}
                                                        </ViewValue>
                                                    </ViewWrap> */}
                                                </ImageItemInfoWrap>
                                            </ImageItemContent>
                                            {/* <Detail>{item.content}</Detail> */}
                                        </ImageItem>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </TablelistGallery>
                </TablelistWrap>
            </Contents>
            {modalPost && (
                <ModalPostDetail
                    id={modalPost}
                    title="대나무숲 게시글"
                    modalType="form"
                    status={status}
                    isnoti={false}
                    setStatus={setStatus}
                    close={() => {
                        setModalPost(null);
                    }}
                />
            )}
        </MainLayout>
    );
};

const TablelistWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 50px 0 36px;
`;
const TablelistGallery = styled.div`
    width: 100%;
`;
const TableHead = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
`;
const Title = styled.div`
    display: flex;
    align-items: center;
`;
const Text = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #737373;
    margin-left: 6.5px;
`;
const FilterWrap = styled.div`
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    background-color: #813bf3;
    height: 46px;
    width: 130px;
    padding: 11px 50px 10px 15px;
    position: relative;
    cursor: pointer;
    color: #f6f6f6;
`;
const OptionWarp = styled.div`
    width: 130px;
    height: 140px;
    border: solid 1px #813bf3;
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 46px;
    left: 0px;
    overflow-y: scroll;
`;
const OptionItem = styled.div`
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #282828;
    padding: 0 15px;
    cursor: pointer;

    &:hover {
        background: #813bf3;
        color: #f6f6f6;
    }
`;
const Arrow = styled.div`
    width: 46px;
    height: 46px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
`;
const TableBody = styled.div``;
const ImageItem = styled.div`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    width: 308px;
    height: 321px;
    background: #ececec;
    margin-right: 29px;
    margin-bottom: 30px;
    background-image: ${props => props.bgImg};
    background-size: cover;
    cursor: pointer;

    &:nth-child(3n) {
        margin-right: 0;
    }

    &:hover {
        background: #813bf3;

        div {
            color: #f6f6f6;
        }
    }
`;
const ImageItemContent = styled.div`
    width: 100%;
    position: absolute;
    bottom: 78px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: ${props => props.bgImg};
    background-size: cover;
`;
const ImageItemTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
`;
const ImageItemInfoWrap = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const HandWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const HandValue = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
    margin-left: 8px;
`;
const ViewWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 22px;
`;
const ViewValue = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
    margin-left: 8px;
`;
const Detail = styled.div`
    padding: 0 16px 0 17px;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #737373;
    margin-top: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: absolute;
    bottom: 23px;
`;

export default Gallery;

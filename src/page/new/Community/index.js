import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainLayout from '../../../Layouts/MainLayout';
import Contents from '../../../Layouts/Contents';

import { ReactComponent as FireIcon } from '../../../static/image/community/fire.svg';
import { ReactComponent as EyeIcon } from '../../../static/image/community/eye.svg';
import { ReactComponent as CameraIcon } from '../../../static/image/community/camera.svg';
import { ReactComponent as HandIcon } from '../../../static/image/community/hand.svg';
import { ReactComponent as ViewIcon } from '../../../static/image/community/view.svg';
import { ReactComponent as MoreIconRight } from '../../../static/image/main/list_icon2.svg';
import { ReactComponent as SaveIcon } from '../../../static/image/main/save_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    allreset,
    getDiary,
    getGallery,
    getTopDiary,
} from '../../../redux/modules/bamboo';
import ModalMakePost from '../../../components/Modal/ModalMakePost';
import ModalPostDetail from '../../../components/Modal/ModalPostDetail';

const bestList = [
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
];

const galleryList = [
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
    { title: 'post title', hand: '381', view: '2486' },
];

const Community = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalmakePost, SetmodalmakePost] = useState(false);
    const [modalPost, setModalPost] = useState(false);
    const [status, setStatus] = useState('view');

    const { Diarylist, TopDiarylist, Gallerylist } = useSelector(
        state => state.bamboo,
    );
    useEffect(() => {
        if (!Diarylist?.length) {
            dispatch(getDiary(0));
        }
        if (!TopDiarylist?.length) {
            dispatch(getTopDiary(0));
        }
        if (!Gallerylist?.length) {
            dispatch(getGallery(0));
        }
    }, []);
    console.log(Gallerylist);
    return (
        <MainLayout nav={true}>
            <Contents header={true}>
                <TablelistWrap>
                    {/* 실시간 Best */}
                    <TablelistBest>
                        <TableHead>
                            <Title>
                                <FireIcon />
                                <Text>실시간 Best</Text>
                            </Title>
                            <More
                                onClick={() => navigate('/new/community/best')}
                            >
                                <MoreText>더보기</MoreText>
                                <MoreIconRight />
                            </More>
                        </TableHead>
                        {TopDiarylist ? (
                            <TableBody>
                                {TopDiarylist?.map((item, key) => {
                                    return (
                                        <BodyItem
                                            key={item?.id}
                                            onClick={() => {
                                                setModalPost(item?.id);
                                            }}
                                        >
                                            <ItemTitle>{item?.title}</ItemTitle>
                                            <ItemInfoWrap>
                                                <HandWrap>
                                                    <HandIcon />
                                                    <HandValue>
                                                        {item?.todackCount}
                                                    </HandValue>
                                                </HandWrap>
                                                <ViewWrap>
                                                    <ViewIcon />
                                                    <ViewValue>
                                                        {item?.viewCount}
                                                    </ViewValue>
                                                </ViewWrap>
                                            </ItemInfoWrap>
                                        </BodyItem>
                                    );
                                })}
                            </TableBody>
                        ) : (
                            <NoData>
                                <NoDataText>게시된 글이 없습니다!</NoDataText>
                                <NoDataBtn>
                                    먼저 게시글을 작성해보세요!
                                </NoDataBtn>
                            </NoData>
                        )}
                    </TablelistBest>

                    {/* 최근 게시글 */}
                    <TablelistRecent>
                        <TableHead>
                            <Title>
                                <EyeIcon />
                                <Text>최근 게시글</Text>
                            </Title>
                            <More
                                onClick={() =>
                                    navigate('/new/community/recent')
                                }
                            >
                                <MoreText>더보기</MoreText>
                                <MoreIconRight />
                            </More>
                        </TableHead>
                        {Diarylist ? (
                            <TableBody>
                                {Diarylist?.map((item, key) => {
                                    return (
                                        <BodyItem
                                            key={item?.id}
                                            onClick={() => {
                                                setModalPost(item?.id);
                                            }}
                                        >
                                            <ItemTitle>{item?.title}</ItemTitle>
                                            <ItemInfoWrap>
                                                <HandWrap>
                                                    <HandIcon />
                                                    <HandValue>
                                                        {item?.todackCount}
                                                    </HandValue>
                                                </HandWrap>
                                                <ViewWrap>
                                                    <ViewIcon />
                                                    <ViewValue>
                                                        {item?.viewCount}
                                                    </ViewValue>
                                                </ViewWrap>
                                            </ItemInfoWrap>
                                        </BodyItem>
                                    );
                                })}
                            </TableBody>
                        ) : (
                            <NoData>
                                <NoDataText>게시된 글이 없습니다!</NoDataText>
                                <NoDataBtn>
                                    먼저 게시글을 작성해보세요!
                                </NoDataBtn>
                            </NoData>
                        )}

                        {/* 게시글 없을 때 */}
                        {/* <NoData>
                            <NoDataText>게시된 글이 없습니다!</NoDataText>
                            <NoDataBtn>먼저 게시글을 작성해보세요!</NoDataBtn>
                        </NoData> */}
                    </TablelistRecent>
                </TablelistWrap>

                {/* 갤러리 */}
                <TablelistImage>
                    <TableHead>
                        <Title>
                            <CameraIcon />
                            <Text>갤러리</Text>
                        </Title>
                        <More
                            onClick={() => navigate('/new/community/gallery')}
                        >
                            <MoreText>더보기</MoreText>
                            <MoreIconRight />
                        </More>
                    </TableHead>
                    <TableBody>
                        {Gallerylist?.map((item, key) => {
                            return (
                                <ImageItem
                                    key={item?.id}
                                    onClick={() => {
                                        setModalPost(item?.id);
                                    }}
                                    bgImg={
                                        item
                                            ? `url(${
                                                  process.env.REACT_APP_IP +
                                                  item.file
                                              })`
                                            : 'none'
                                    }
                                >
                                    <ImageItemContent>
                                        <ImageItemTitle>
                                            {item?.title}
                                        </ImageItemTitle>
                                        <ImageItemInfoWrap>
                                            <HandWrap>
                                                <HandIcon />
                                                <HandValue>
                                                    {item?.todack_count}
                                                </HandValue>
                                            </HandWrap>
                                        </ImageItemInfoWrap>
                                    </ImageItemContent>
                                </ImageItem>
                            );
                        })}
                    </TableBody>

                    <SaveButton
                        onClick={() => {
                            SetmodalmakePost(true);
                        }}
                    >
                        <SaveButtonText>대나무숲 게시글 작성</SaveButtonText>
                        <SaveIcon />
                    </SaveButton>
                </TablelistImage>
            </Contents>
            {modalmakePost && (
                <ModalMakePost
                    title="대나무숲 게시글 작성"
                    modalType="form"
                    close={() => {
                        SetmodalmakePost(false);
                    }}
                />
            )}
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
                        dispatch(allreset());
                        dispatch(getDiary(0));
                        dispatch(getTopDiary(0));
                        dispatch(getGallery(0));
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
const TablelistBest = styled.div`
    width: 100%;
    margin-right: 35px;
`;

const TablelistRecent = styled.div`
    width: 100%;
    margin-left: 35px;
`;
const TablelistImage = styled.div`
    padding-bottom: 80px;
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
const More = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
const MoreText = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    text-align: right;
    text-decoration-line: underline;
    color: #737373;
    margin-right: 7px;
`;
const TableBody = styled.div``;
const BodyItem = styled.div`
    width: 100%;
    padding: 12px 23px 14px 11px;
    border-bottom: solid 1px #737373;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
const ItemTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
`;
const ItemInfoWrap = styled.div`
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
const ImageItem = styled.div`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    width: 308px;
    height: 266px;
    background: #ececec;
    margin-right: 30px;
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
    bottom: 14px;
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
`;
const SaveButton = styled.button`
    width: 100%;
    max-width: 436px;
    height: 46px;
    border: solid 3px #813bf3;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px auto 0;
`;
const SaveButtonText = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    color: #813bf3;
    margin-right: 10px;
`;
const NoData = styled.div`
    width: 100%;
    height: 300px;
    border: solid 3px #ececec;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const NoDataText = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    color: #737373;
`;
const NoDataBtn = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    text-decoration-line: underline;
    color: #737373;
`;
export default Community;

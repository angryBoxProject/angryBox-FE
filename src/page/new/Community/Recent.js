import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainLayout from '../../../Layouts/MainLayout';
import Contents from '../../../Layouts/Contents';
import { useInView } from 'react-intersection-observer';

import { ReactComponent as EyeIcon } from '../../../static/image/community/eye.svg';
import { ReactComponent as HandIcon } from '../../../static/image/community/hand.svg';
import { ReactComponent as ViewIcon } from '../../../static/image/community/view.svg';
import { ReactComponent as FilterArrow } from '../../../static/image/community/filter_arrow.svg';
import { tokenURL } from '../../../Apis/API';
import BambooSocket from '../../../components/bamboo/BambooSocket';
import ModalPostDetail from '../../../components/Modal/ModalPostDetail';

const recentList = [
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
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용',
    },
    {
        title: 'post title',
        hand: '381',
        view: '2486',
        datetime: '04.08',
        contents:
            '본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내',
    },
];

const optionItems = ['필터적용', '필터1', '필터2', '필터3'];

const Recent = props => {
    const [select, setSelect] = useState(false);
    const [option, setOption] = useState('필터적용');
    const navigate = useNavigate();

    const [ref, inView] = useInView();
    const [recentList, setRecentList] = useState([]);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('view');

    const [modalPost, setModalPost] = useState();

    const getList = useCallback(async () => {
        console.log(recentList);
        setLoading(true);
        const data = {
            startDate: '',
            endDate: '',
            imageFilter: 2,
            angry: [],
        };
        // await tokenURL.get(`/diaries/todayTop/${lastId}/5`).then(res => {
        await tokenURL
            .post(`/diaries?lastDiaryId=${lastId}&size=5`, data)
            .then(res => {
                console.log(res);
                const list = res.data.data.diaries;
                // const list = res.data.data.todayTopDiary;
                setRecentList(prevState => [...prevState, ...list]);
            });
        setLoading(false);
    }, [lastId]);

    useEffect(() => {
        getList();
    }, [getList]);

    useEffect(() => {
        if (inView && !loading) {
            setLastId(prevState => prevState + 5);
        }
    }, [inView, loading]);

    return (
        <MainLayout nav={true}>
            <Contents header={true}>
                <TablelistWrap>
                    <TablelistRecent>
                        <TableHead>
                            <Title>
                                <EyeIcon />
                                <Text>최근 게시글</Text>
                            </Title>
                            {/* <FilterWrap onClick={() => setSelect(!select)}>
                                {option}

                                <Arrow style={{transform: select ? "rotate(180deg) translate(0, 50%)" : ""}}>
                                    <FilterArrow />
                                </Arrow>
                                {select &&
                                    <OptionWarp>
                                        {optionItems.map((option, key) => {
                                            return(
                                                <OptionItem key={key} onClick={() => setOption(option)}>
                                                    {option}
                                                </OptionItem>
                                            )
                                        })}
                                    </OptionWarp>
                                }
                            </FilterWrap> */}
                        </TableHead>
                        <TableBody>
                            {recentList.map((item, key) => (
                                <div
                                    key={key}
                                    onClick={() => {
                                        setModalPost(item?.id);
                                    }}
                                >
                                    {recentList.length - 1 == key ? (
                                        <BodyItem ref={ref}>
                                            <TitleWrap>
                                                <ItemTitleWrap>
                                                    <ItemTitle>
                                                        {item.title}
                                                    </ItemTitle>
                                                    <ItemDate>
                                                        {item.datetime}
                                                    </ItemDate>
                                                </ItemTitleWrap>
                                                <ItemInfoWrap>
                                                    <HandWrap>
                                                        <HandIcon />
                                                        <HandValue>
                                                            {item.todackCount}
                                                        </HandValue>
                                                    </HandWrap>
                                                    <ViewWrap>
                                                        <ViewIcon />
                                                        <ViewValue>
                                                            {item.viewCount}
                                                        </ViewValue>
                                                    </ViewWrap>
                                                </ItemInfoWrap>
                                            </TitleWrap>
                                            <Detail>{item.content}</Detail>
                                        </BodyItem>
                                    ) : (
                                        <BodyItem>
                                            <TitleWrap>
                                                <ItemTitleWrap>
                                                    <ItemTitle>
                                                        {item.title}
                                                    </ItemTitle>
                                                    <ItemDate>
                                                        {item.datetime}
                                                    </ItemDate>
                                                </ItemTitleWrap>
                                                <ItemInfoWrap>
                                                    <HandWrap>
                                                        <HandIcon />
                                                        <HandValue>
                                                            {item.todackCount}
                                                        </HandValue>
                                                    </HandWrap>
                                                    <ViewWrap>
                                                        <ViewIcon />
                                                        <ViewValue>
                                                            {item.viewCount}
                                                        </ViewValue>
                                                    </ViewWrap>
                                                </ItemInfoWrap>
                                            </TitleWrap>
                                            <Detail>{item.content}</Detail>
                                        </BodyItem>
                                    )}
                                </div>
                            ))}
                        </TableBody>
                    </TablelistRecent>
                </TablelistWrap>
            </Contents>
            <BambooSocket itemlist={recentList} setitem={setRecentList} />
            {modalPost && (
                <ModalPostDetail
                    id={modalPost}
                    title="대나무숲 게시글"
                    modalType="form"
                    isnoti={false}
                    status={status}
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
const TablelistRecent = styled.div`
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
const BodyItem = styled.div`
    width: 100%;
    height: 208px;
    padding: 18px 32.5px 16.5px;
    background: #ececec;
    cursor: pointer;
    margin-bottom: 30px;
`;
const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const ItemTitleWrap = styled.div``;
const ItemTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
`;
const ItemDate = styled.div`
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
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
const Detail = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #737373;
    margin-top: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
`;

export default Recent;

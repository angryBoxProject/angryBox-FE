import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FlexDiv } from '../../elements';
import useIsMount from '../../hooks/useIsMount';
import { getTopDiary } from '../../redux/modules/bamboo';
import { ReactComponent as Fire } from '../../static/image/Fire.svg';
import theme from '../../Styles/theme';
import ModaPostDetail from '../Modal/ModalPostDetail';
import BambooListCard from './BambooListCard';

const BambooTopDiary = props => {
    const { lastTopDiaryId, TopDiarylist, hasMoreToplist, Toplistloading } =
        useSelector(state => state.bamboo);

    const dispatch = useDispatch();
    const scrollRef = useRef();
    const isMount = useIsMount();
    const [modalPost, setModalPost] = useState();

    useEffect(() => {
        function onScroll() {
            const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;
            if (clientHeight + scrollTop > scrollHeight - 300) {
                if (
                    hasMoreToplist &&
                    TopDiarylist &&
                    !Toplistloading &&
                    isMount.current
                ) {
                    dispatch(getTopDiary(lastTopDiaryId));
                }
            }
        }
        scrollRef.current.addEventListener('scroll', onScroll);
        return () => {
            scrollRef.current.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreToplist, TopDiarylist, Toplistloading, isMount]);

    return (
        <>
            <Warp>
                <FlexDiv>
                    <ListDiary>
                        <Titlepagename>BAMBOO FOREST</Titlepagename>
                    </ListDiary>
                    <Titlepagename>검색창</Titlepagename>
                </FlexDiv>
                <FlexDiv>
                    <Fire />
                    <SubTitle>실시간 Best</SubTitle>
                </FlexDiv>
                <ListScroll ref={scrollRef}>
                    {TopDiarylist?.map((data, index) => (
                        <>
                            <BambooListCard
                                key={index}
                                angryPhaseId={data.angryPhaseId}
                                coinBankId={data.coinBankId}
                                content={data.content}
                                dailyTopId={data.dailyTopId}
                                dateTime={data.dateTime}
                                diaryNo={data.diaryNo}
                                id={data.id}
                                isPublic={data.isPublic}
                                memberId={data.memberId}
                                title={data.title}
                                todackCount={data.todackCount}
                                todayTopId={data.todayTopId}
                                viewCount={data.viewCount}
                                onClick={() => {
                                    setModalPost(true);
                                }}
                            />
                            <ModaPostDetail
                                title="ANGRY SAVING"
                                subtitle="분노 게시글"
                                width="70%"
                                height="80%"
                                open={modalPost}
                                close={() => {
                                    setModalPost(false);
                                }}
                                data={data}
                                button1name={'닫기'}
                                is_twobutton
                                button2name={'수정하기'}
                            ></ModaPostDetail>
                        </>
                    ))}
                </ListScroll>
            </Warp>
        </>
    );
};
const Warp = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px 100px 50px 50px;
    background-color: ${theme.color.black};
`;
const Titlepagename = styled.div`
    padding: 0px 0px 43px 0px;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
`;
const ListDiary = styled.div`
    width: 50%;
`;
const SubTitle = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
`;
const ListScroll = styled.div`
    min-height: 40%;
    height: calc(100% - 5rem);
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
export default BambooTopDiary;

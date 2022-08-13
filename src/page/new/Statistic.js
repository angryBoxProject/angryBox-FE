import React, { useState } from 'react';
import styled from 'styled-components';

import MainLayout from '../../Layouts/MainLayout';
import Contents from '../../Layouts/Contents';
import AngryCalendar from '../../components/angrybook/AngryCalendar';
import AngryBookProfile from '../../components/angrybook/AngryBookProfile';
import AngryChart from '../../components/angrybook/AngryChart';
import ModalLayout from '../../Layouts/ModalLayout';

import { ReactComponent as FireIcon } from '../../static/image/community/fire.svg';
import { ReactComponent as ButtonIcon } from '../../static/image/statistic/icon.svg';
import ModalLoad from '../../components/Modal/ModalLoad';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useBankDiarylist } from '../../hooks/useBankDiarylist';
import ModalPostDetail from '../../components/Modal/ModalPostDetail';

const list = [
    { datetime: '04/08', detail: '오늘 요리했는데 개망함', status: '소노' },
    { datetime: '04/08', detail: '오늘 요리했는데 개망함', status: '소노' },
    { datetime: '04/08', detail: '오늘 요리했는데 개망함', status: '소노' },
];
const Statistic = props => {
    const [modal, setModal] = useState(false);
    const [statuss, setStatus] = useState('view');

    const [modalPost, setModalPost] = useState();

    const selectDay =
        useSelector(state => state.main.calendarDay) ?? moment().format();

    const data = {
        date: selectDay,
        lastDiaryId: 0,
        size: 5,
    };
    const {
        status,
        data: bankdiarylist,
        error,
        isFetching,
        refetch,
    } = useBankDiarylist(selectDay);

    const angryPhase = id => {
        const list = ['극대노', '대노', '중노', '소노', '극소노'];
        return list[id];
    };
    const monthdate = date => {
        return moment(date, 'YYYY-MM-DD').month() + 1;
    };
    const daydate = date => {
        return moment(date, 'YYYY-MM-DD').day();
    };

    return (
        <MainLayout nav={true}>
            <Contents header={true}>
                <Calendar>
                    <TitleArea>
                        <FireIcon />
                        <Title>캘린더</Title>
                    </TitleArea>

                    <AngryCalendar />
                </Calendar>

                <StatisticWrap>
                    <AngryBookProfile />
                    <AngryChart />
                </StatisticWrap>

                <RecentList>
                    {bankdiarylist?.map((item, key) => {
                        return (
                            <Item
                                key={key}
                                onClick={() => {
                                    setModalPost(item?.id);
                                }}
                            >
                                <ItemLeft>
                                    <Date>
                                        {monthdate(item.dateTime) +
                                            '/' +
                                            daydate(item.dateTime)}
                                    </Date>
                                    <Detail>{item.title}</Detail>
                                </ItemLeft>
                                <ItemRight>
                                    {angryPhase(item.angryPhaseId)}
                                </ItemRight>
                            </Item>
                        );
                    })}
                </RecentList>
                <LinkBUttonWrap>
                    <LinkButton
                        onClick={() => {
                            setModal(true);
                        }}
                    >
                        <LinkButtonText>
                            가장 최근 분노 통장 보러 가기
                        </LinkButtonText>
                        <ButtonIcon />
                    </LinkButton>
                </LinkBUttonWrap>

                {modal && (
                    <ModalLoad
                        title="적금 불러오기"
                        modalType="list"
                        contentType="bank"
                        close={() => setModal(false)}
                    />
                )}
                {modalPost && (
                    <ModalPostDetail
                        id={modalPost}
                        title="분노 게시글"
                        modalType="form"
                        status={statuss}
                        setStatus={setStatus}
                        close={() => {
                            setModalPost(null);
                        }}
                    />
                )}
            </Contents>
        </MainLayout>
    );
};
const Calendar = styled.div`
    width: 100%;
    margin-top: 50px;
`;
const TitleArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 46px;
`;
const Title = styled.div`
    display: inline-block;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #282828;
    margin-left: 13.5px;
`;

const StatisticWrap = styled.div`
    width: 100%;
    margin-top: 90px;
`;
const RecentList = styled.div`
    width: 100%;
    padding: 57px 20px 62px;
`;
const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    cursor: pointer;
`;
const ItemLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Date = styled.div`
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
    margin-right: 46px;
    width: 75px;
`;
const Detail = styled.div`
    width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
`;
const ItemRight = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
`;
const LinkBUttonWrap = styled.div`
    padding-bottom: 72px;
`;
const LinkButton = styled.button`
    width: 100%;
    max-width: 436px;
    height: 46px;
    border: solid 3px #813bf3;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;
const LinkButtonText = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    color: #813bf3;
    margin-right: 10px;
`;

export default Statistic;

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

const list = [
    { datetime: '04/08', detail: '오늘 요리했는데 개망함', status: '소노' },
    { datetime: '04/08', detail: '오늘 요리했는데 개망함', status: '소노' },
    { datetime: '04/08', detail: '오늘 요리했는데 개망함', status: '소노' },
];
const Statistic = props => {
    const [modal, setModal] = useState(false);

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
                    {list.map((item, key) => {
                        return (
                            <Item key={key}>
                                <ItemLeft>
                                    <Date>{item.datetime}</Date>
                                    <Detail>{item.detail}</Detail>
                                </ItemLeft>
                                <ItemRight>{item.status}</ItemRight>
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

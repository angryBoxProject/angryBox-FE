import React, { useState } from 'react';
import AngryBookDiarylist from '../components/angrybook/AngryBookDiarylist';
import AngryBookProfile from '../components/angrybook/AngryBookProfile';
import AngryCalendar from '../components/angrybook/AngryCalendar';
import AngryChart from '../components/angrybook/AngryChart';
import { ReactComponent as Fire } from '../static/image/Fire.svg';

import { Button, FlexDiv } from '../elements';
import { ReactComponent as Paperfiledocument } from '../static/image/Paperfiledocument.svg';
import styled from 'styled-components';
import ModalImportBook from '../components/Modal/ModalImportBook';

//Paperfiledocument
const AngryBook = props => {
    const [isCalendar, setIsCalendar] = useState(true);
    return (
        <>
            <SubTitle>AngryBook</SubTitle>
            <ModalImportBook
                title="IMPORT BOOK"
                subtitle="적금 불러오기"
                width="80%"
                height="80%"
                open={true}
                close={false}
            />
            <FlexDiv>
                <FlexDiv grow="1" column={true}>
                    <FlexDiv justify="space-between">
                        {isCalendar ? (
                            <FlexDiv>
                                <Fire />
                                캘린더
                            </FlexDiv>
                        ) : (
                            <FlexDiv>
                                <Fire />
                                분노 적금
                            </FlexDiv>
                        )}
                        <Button
                            width="100px"
                            padding="2px"
                            height="20px"
                            onClick={() => {
                                setIsCalendar(!isCalendar);
                            }}
                        >
                            적금별보기
                        </Button>
                    </FlexDiv>
                    <AngryCalendar />
                </FlexDiv>
                <div style={{ minWidth: '50%' }}>
                    <AngryBookProfile />
                    <AngryChart />
                    <AngryBookDiarylist />
                </div>
            </FlexDiv>
            <Button height={'48px'} padding="0px">
                가장 최근 분노 통장 보러 가기
                <Paperfiledocument style={{ display: 'inline' }} />
            </Button>
        </>
    );
};

const SubTitle = styled.div`
    font-family: 'Hanson';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
`;
export default AngryBook;

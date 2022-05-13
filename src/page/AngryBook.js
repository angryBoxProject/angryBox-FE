import React from 'react';
import AngryBookDiarylist from '../components/angrybook/AngryBookDiarylist';
import AngryBookProfile from '../components/angrybook/AngryBookProfile';
import AngryCalendar from '../components/angrybook/AngryCalendar';
import AngryChart from '../components/angrybook/AngryChart';
import { Button, FlexDiv } from '../elements';
import { ReactComponent as Paperfiledocument } from '../static/image/Paperfiledocument.svg';

//Paperfiledocument
const AngryBook = props => {
    return (
        <>
            <div>AngryBook</div>
            <FlexDiv>
                <AngryCalendar />
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

export default AngryBook;

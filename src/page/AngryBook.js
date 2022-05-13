import React from 'react';
import AngryBookDiarylist from '../components/angrybook/AngryBookDiarylist';
import AngryBookProfile from '../components/angrybook/AngryBookProfile';
import AngryCalendar from '../components/angrybook/AngryCalendar';
import AngryChart from '../components/angrybook/AngryChart';
import { FlexDiv } from '../elements';
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
        </>
    );
};

export default AngryBook;

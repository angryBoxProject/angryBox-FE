import React from 'react';
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
                    <div>myprofile</div>
                    <AngryChart />
                </div>
            </FlexDiv>
        </>
    );
};

export default AngryBook;

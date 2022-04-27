import React from 'react';
import AngryCalendar from '../components/angrybook/AngryCalendar';
import { FlexDiv } from '../elements';
const AngryBook = props => {
    return (
        <>
            <div>AngryBook</div>
            <FlexDiv>
                <AngryCalendar />
                <div style={{ minWidth: '50%' }}>myprofile</div>
            </FlexDiv>
        </>
    );
};
export default AngryBook;

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import styled from 'styled-components';
import moment from 'moment';
import { useMonthBankCalender } from '../../hooks/useMonthBankCalender';
import useIsMount from '../../hooks/useIsMount';

const AngryCalendar = props => {
    const Selectdate = '2022-04';
    const [value, SetValue] = useState();
    const [mark, setMark] = useState(['']);
    const {
        status,
        data: Markerlist,
        error,
        isFetching,
        refetch,
    } = useMonthBankCalender(Selectdate);
    const ismount = useIsMount();
    useEffect(() => {
        // if (ismount.current) {
        //     if(status)
        //     setMark(Object.keys(Markerlist));
        // }
    }, [ismount]);
    console.log(mark);

    return (
        <>
            <Warp>
                <Calendar
                    onChange={e => {
                        SetValue(e);
                        console.log('onChange', e);
                    }}
                    value={value}
                    formatMonthYear={(locale, date) =>
                        moment(date).format('YYYY.MM')
                    }
                    // 날짜표기형식 01 => 1
                    formatDay={(locale, date) => moment(date).format('D')}
                    // 다른 달 날짜 표기
                    showNeighboringMonth={false}
                    // 달력 유형 (일요일시작)
                    calendarType={'US'}
                    // 연도이동아이콘숨기기
                    next2Label={null}
                    prev2Label={null}
                    // 요일 영어로 표시
                    locale={'en'}
                    formatShortWeekday={(locale, date) =>
                        ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
                    }
                    // 특정 날짜에 표시
                    tileContent={({ date, view }) => {
                        let isDot = [];
                        if (date)
                            if (
                                mark.find(
                                    x =>
                                        x === moment(date).format('YYYY-MM-DD'),
                                )
                            ) {
                                isDot.push(<div className="dot"></div>);
                                console.log(isDot);
                            }
                        return (
                            <>
                                <div className="flex justify-center items-center absoluteDiv">
                                    {isDot}
                                </div>
                            </>
                        );
                    }}
                />
            </Warp>
        </>
    );
};
const Warp = styled.div`
    width: 100%;
    height: 100%;
`;
export default AngryCalendar;

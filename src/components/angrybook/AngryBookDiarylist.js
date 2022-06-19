import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FlexDiv } from '../../elements';
import { useBankDiarylist } from '../../hooks/useBankDiarylist';
import bank, { getMonthDiaryList } from '../../redux/modules/bank';
import Moment from 'react-moment';
import moment from 'moment';

const AngryBookDiarylist = props => {
    const dispatch = useDispatch();
    const data = {
        date: '2022-06-01',
        lastDiaryId: 0,
        size: 5,
    };
    const {
        status,
        data: bankdiarylist,
        error,
        isFetching,
        refetch,
    } = useBankDiarylist('2022-06-01');

    // const month = moment('2019-12-10', 'YYYY-MM-DD');

    console.log();
    console.log(bankdiarylist);
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

    const renderByStatus = useCallback(() => {
        switch (status) {
            case 'loading':
                return <div>loading</div>;
            case 'error':
                if (error instanceof Error) {
                    return <span>Error: {error.message}</span>;
                }
                break;
            default:
                return (
                    <>
                        <Warp>
                            {bankdiarylist?.map((data, index) => (
                                <FlexDiv
                                    justify="space-between"
                                    padding="1% 0px 0px 0px"
                                >
                                    <div>
                                        {monthdate(data.dateTime) +
                                            '/' +
                                            daydate(data.dateTime)}
                                    </div>
                                    <div>{data.title}</div>
                                    <div>{angryPhase(data.angryPhaseId)}</div>
                                </FlexDiv>
                            ))}
                        </Warp>
                    </>
                );
        }
    }, [status, isFetching]);
    // const banklist = useSelector(state => state.bank.banklist);
    // useEffect(() => {
    //     const data = {
    //         date: '2022-04-18',
    //         lastDiaryId: 0,
    //         size: 5,
    //     };
    //     dispatch(getMonthDiaryList(data));
    // }, []);
    // console.log(banklist);
    return <>{renderByStatus()}</>;
};

const Warp = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5% 15% 0% 3%;
`;
export default AngryBookDiarylist;

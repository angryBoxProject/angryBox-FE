import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getMonthDiaryList } from '../../redux/modules/bank';

const AngryBookDiarylist = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const data = {
            date: '2022-04-18',
            lastDiaryId: 0,
            size: 5,
        };
        dispatch(getMonthDiaryList(data));
    });
    return (
        <>
            <Warp>AngryBookDiarylist</Warp>
        </>
    );
};

const Warp = styled.div`
    padding: 48px 20px 48px 20px;
`;
export default AngryBookDiarylist;

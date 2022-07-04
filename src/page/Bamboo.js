import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../Styles/theme';

import BambooSocket from '../components/bamboo/BambooSocket';
import { FlexDiv } from '../elements';
import {
    getDiary,
    getFirstDiary,
    getFirstTopDiary,
    getTopDiary,
} from '../redux/modules/bamboo';
import TopDiary from '../components/bamboo/TopDiary';
import RealTimeDiary from '../components/bamboo/RealTimeDiary';
import BambooGallayList from '../components/bamboo/BambooGallayList';
const Bamboo = props => {
    const dispatch = useDispatch();
    const { TopDiarylist } = useSelector(state => state.bamboo);
    const { Diarylist } = useSelector(state => state.bamboo);
    useEffect(() => {
        if (!Diarylist.length) {
            dispatch(getDiary(0));
        }
        if (!TopDiarylist.length) {
            console.log('test');
            dispatch(getTopDiary(0));
        }
        // dispatch(getDiary(-1));
    }, []);
    return (
        <>
            <Warp>
                <FlexDiv>
                    <ListDiary>
                        <Titlepagename>BAMBOO FOREST</Titlepagename>
                        <TopDiary TopDiarylist={TopDiarylist} />
                        <RealTimeDiary Diarylist={Diarylist} />
                    </ListDiary>
                    <FlexDiv column="column">
                        <Titlepagename>BAMBOO FOREST</Titlepagename>
                        <BambooGallayList />
                    </FlexDiv>
                </FlexDiv>
            </Warp>
            <BambooSocket />
        </>
    );
};

const Warp = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px 100px 50px 50px;
    background-color: ${theme.color.black};
`;
const Titlepagename = styled.div`
    font-family: 'Hanson';
    font-style: normal;
    padding: 0px 0px 43px 0px;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
`;
const ListDiary = styled.div`
    width: 50%;
`;
export default Bamboo;

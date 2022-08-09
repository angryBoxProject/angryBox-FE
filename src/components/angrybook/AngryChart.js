import React, { useCallback, useState } from 'react';
import { RadialChart } from 'react-vis';
import { FlexDiv } from '../../elements';
import { useMonthchart } from '../../hooks/useMonthchart';
import styled from 'styled-components';
import moment from 'moment';

const AngryChart = props => {
    const {
        status,
        data: chartlist,
        error,
        isFetching,
        refetch,
    } = useMonthchart(moment().format('YYYY-MM'));
    console.log(chartlist);
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
                            <Chart>
                                <RadialChart
                                    data={[
                                        {
                                            angle: chartlist.apPerList[4],
                                            color: '#813BF3',
                                            label: '극대노',
                                        },
                                        {
                                            angle: chartlist.apPerList[3],
                                            color: '#8E52F0',
                                        },
                                        {
                                            angle: chartlist.apPerList[2],
                                            color: '#A172EE',
                                        },
                                        {
                                            angle: chartlist.apPerList[1],
                                            color: '#B694EC',
                                        },
                                        {
                                            angle: chartlist.apPerList[0],
                                            color: '#CAB6EA',
                                        },
                                    ]}
                                    width={260}
                                    height={260}
                                    colorType="literal"
                                />
                                <FlexDiv
                                    column={true}
                                    align="flex-start"
                                    justify="center"
                                    grow="1"
                                >
                                    <CustomFlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <ListTitle list="#813BF3">
                                                극대노
                                            </ListTitle>
                                            <Underline>
                                                {chartlist.apList[4]}회 (
                                                {chartlist.apPerList[4]}%)
                                            </Underline>
                                        </FlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <ListTitle list="#8E52F0">
                                                대노
                                            </ListTitle>
                                            <Underline>
                                                {chartlist.apList[3]}회 (
                                                {chartlist.apPerList[3]}%)
                                            </Underline>
                                        </FlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <ListTitle list="#A172EE">
                                                중노
                                            </ListTitle>
                                            <Underline>
                                                {chartlist.apList[2]}회 (
                                                {chartlist.apPerList[2]}%)
                                            </Underline>
                                        </FlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <ListTitle list="#B694EC">
                                                소노
                                            </ListTitle>
                                            <Underline>
                                                {chartlist.apList[1]}회 (
                                                {chartlist.apPerList[1]}%)
                                            </Underline>
                                        </FlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <ListTitle list="#CAB6EA">
                                                극소노
                                            </ListTitle>
                                            <Underline>
                                                {chartlist.apList[0]}회 (
                                                {chartlist.apPerList[0]}%)
                                            </Underline>
                                        </FlexDiv>
                                    </CustomFlexDiv>
                                </FlexDiv>
                            </Chart>
                        </Warp>
                    </>
                );
        }
    }, [status, isFetching]);
    return <>{renderByStatus()}</>;
};
const Warp = styled.div`
    min-width: 100%;
    max-height: 100%;
`;
const Chart = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 44px 100px 44px;
    border-bottom: solid 1px #737373;
`;
const Angrylist = styled.div`
    width: 100%;
    align-items: center;
`;
const CustomFlexDiv = styled.div`
    display: flex;
    padding-left: 157px;
    width: 80%;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
`;

const Underline = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    text-align: right;
    text-decoration-line: underline;
    color: #282828;
`;

const ListTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #282828;

    &:before {
        content: '';
        background: ${props => props.list};
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 5px;
        margin-right: 20px;
    }
`;
export default AngryChart;

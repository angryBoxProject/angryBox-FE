import React, { useCallback, useState } from 'react';
import { RadialChart } from 'react-vis';
import { FlexDiv } from '../../elements';
import { useMonthchart } from '../../hooks/useMonthchart';
import styled from 'styled-components';

const AngryChart = props => {
    const {
        status,
        data: chartlist,
        error,
        isFetching,
        refetch,
    } = useMonthchart('2022-05-01');

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
                            <FlexDiv padding="0 0 3% 0">
                                <RadialChart
                                    data={[
                                        {
                                            angle: chartlist.apPerList[4],
                                            color: '#DA463C',
                                            label: '극대노',
                                        },
                                        {
                                            angle: chartlist.apPerList[3],
                                            color: '#EA675E',
                                        },
                                        {
                                            angle: chartlist.apPerList[2],
                                            color: '#E2766F',
                                        },
                                        {
                                            angle: chartlist.apPerList[1],
                                            color: '#E38E88',
                                        },
                                        {
                                            angle: chartlist.apPerList[0],
                                            color: '#E8AEAA',
                                        },
                                    ]}
                                    width={250}
                                    height={250}
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
                                            <div>극대노</div>
                                            <Underline>
                                                {chartlist.apList[4]}회 (
                                                {chartlist.apPerList[4]}%)
                                            </Underline>
                                        </FlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <div>대노</div>
                                            <Underline>
                                                {chartlist.apList[3]}회 (
                                                {chartlist.apPerList[3]}%)
                                            </Underline>
                                        </FlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <div>중노</div>
                                            <Underline>
                                                {chartlist.apList[2]}회 (
                                                {chartlist.apPerList[2]}%)
                                            </Underline>
                                        </FlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <div>소노</div>
                                            <Underline>
                                                {chartlist.apList[1]}회 (
                                                {chartlist.apPerList[1]}%)
                                            </Underline>
                                        </FlexDiv>
                                        <FlexDiv
                                            justify="space-between"
                                            padding="3%"
                                        >
                                            <div>극소노</div>
                                            <Underline>
                                                {chartlist.apList[0]}회 (
                                                {chartlist.apPerList[0]}%)
                                            </Underline>
                                        </FlexDiv>
                                    </CustomFlexDiv>
                                </FlexDiv>
                            </FlexDiv>
                            <hr></hr>
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
const Angrylist = styled.div`
    width: 100%;
    align-items: center;
`;
const CustomFlexDiv = styled.div`
    display: flex;
    padding-left: 10%;
    width: 80%;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
`;

const Underline = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height */

    text-align: right;
    text-decoration-line: underline;
`;
export default AngryChart;

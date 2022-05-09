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
    console.log(chartlist);
    const myData = [
        { angle: chartlist.apPerList[4], color: '#DA463C', label: '극대노' },
        { angle: chartlist.apPerList[3], color: '#EA675E' },
        { angle: chartlist.apPerList[2], color: '#E2766F' },
        { angle: chartlist.apPerList[1], color: '#E38E88' },
        { angle: chartlist.apPerList[0], color: '#E8AEAA' },
    ];

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
                            <FlexDiv>
                                <RadialChart
                                    data={myData}
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
                                    <FlexDiv justify="space-between">
                                        <div>극대노</div>
                                        <div>{chartlist.apList[4]}</div>
                                    </FlexDiv>
                                    <FlexDiv justify="space-between">
                                        <div>대노</div>
                                        <div>{chartlist.apList[3]}</div>
                                    </FlexDiv>
                                    <FlexDiv justify="space-between">
                                        <div>중노</div>
                                        <div>{chartlist.apList[2]}</div>
                                    </FlexDiv>
                                    <FlexDiv justify="space-between">
                                        <div>소노</div>
                                        <div>{chartlist.apList[1]}</div>
                                    </FlexDiv>
                                    <FlexDiv justify="space-between">
                                        <div>극소노</div>
                                        <div>{chartlist.apList[0]}</div>
                                    </FlexDiv>
                                </FlexDiv>
                            </FlexDiv>
                        </Warp>
                    </>
                );
        }
    }, [status, isFetching]);
    return <>{renderByStatus()}</>;
};
const Warp = styled.div`
    min-width: 100%;
`;
const Angrylist = styled.div`
    width: 100%;
    align-items: center;
`;
export default AngryChart;

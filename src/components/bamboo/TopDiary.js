import React from 'react';
import styled from 'styled-components';
import theme from '../../Styles/theme';
import { FlexDiv } from '../../elements';
import { ReactComponent as Fire } from '../../static/image/Fire.svg';
import { IoIosArrowForward } from 'react-icons/io';
const TopDiary = props => {
    const { TopDiarylist } = props;
    console.log(TopDiarylist);

    return (
        <>
            <div>
                <FlexDiv justify="space-between">
                    <FlexDiv padding="0px 0px 37px 0px">
                        <Fire />
                        <SubTitle>실시간 Best</SubTitle>
                    </FlexDiv>
                    <FlexDiv>
                        <div>더보기</div>
                        <IoIosArrowForward
                            size="23px"
                            color={theme.color.white}
                        />
                    </FlexDiv>
                </FlexDiv>
                {TopDiarylist?.map((data, index) => {
                    if (index < 5) {
                        return (
                            <FlexDiv
                                padding="13px 0px 14px 0px"
                                justify="space-between"
                                key={index}
                            >
                                <span>{data.title}</span>
                                <span>{data.todackCount}</span>
                                <span>{data.viewCount}</span>
                            </FlexDiv>
                        );
                    }
                })}
            </div>
        </>
    );
};

const SubTitle = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
`;

export default TopDiary;

import React from 'react';
import styled from 'styled-components';
import theme from '../../Styles/theme';
import { FlexDiv } from '../../elements';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Eyes } from '../../static/image/Eyes.svg';
import { ReactComponent as View } from '../../static/image/View.svg';
import { ReactComponent as Todack } from '../../static/image/Todack.svg';
import { useDispatch } from 'react-redux';
import { getDiary, removelistDiary } from '../../redux/modules/bamboo';

const RealTimeDiary = props => {
    const { Diarylist } = props;
    console.log(Diarylist);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <div>
                <FlexDiv justify="space-between">
                    <FlexDiv padding="0px 0px 37px 0px">
                        <Eyes />
                        <SubTitle>최신 게시글</SubTitle>
                    </FlexDiv>
                    <FlexDiv
                        onClick={() => {
                            dispatch(removelistDiary());
                            dispatch(getDiary(0));
                            navigate('/bamboo/realtimediary', {
                                state: Diarylist,
                            });
                        }}
                    >
                        <div>더보기</div>
                        <IoIosArrowForward
                            size="23px"
                            color={theme.color.white}
                        />
                    </FlexDiv>
                </FlexDiv>
                {Diarylist?.map((data, index) => {
                    if (index < 5) {
                        return (
                            <FlexDiv
                                padding="13px 0px 14px 0px"
                                justify="space-between"
                                key={index}
                            >
                                <span>{data.title}</span>
                                <Todack />
                                <span>{data.todackCount}</span>
                                <View />
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
export default RealTimeDiary;

import React, { useState } from 'react';
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
import ModaPostDetail from '../Modal/ModalPostDetail';

const RealTimeDiary = props => {
    const { Diarylist } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalPost, setModalPost] = useState();

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
                            <>
                                <FlexDiv
                                    padding="13px 0px 14px 0px"
                                    justify="space-between"
                                    key={index}
                                    onClick={() => {
                                        setModalPost(true);
                                    }}
                                >
                                    <span>{data.title}</span>
                                    <Todack />
                                    <span>{data.todackCount}</span>
                                    <View />
                                    <span>{data.viewCount}</span>
                                </FlexDiv>
                                <ModaPostDetail
                                    title="ANGRY SAVING"
                                    subtitle="분노 게시글"
                                    width="70%"
                                    height="80%"
                                    open={modalPost}
                                    close={() => {
                                        setModalPost(false);
                                    }}
                                    data={data}
                                    button1name={'닫기'}
                                    is_twobutton
                                    button2name={'수정하기'}
                                    button2onClick={() => {}}
                                ></ModaPostDetail>
                            </>
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

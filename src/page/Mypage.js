import React, { useCallback, useEffect } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FlexDiv } from '../elements';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';

const Mypage = props => {
    const isLogin = useSelector(state => state.member.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, data: profileList, error, isFetching } = useProfile();
    console.log(profileList);

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
                        <FlexDiv>
                            <FlexDiv>
                                <ProfileCircle>
                                    <ProfileImage
                                        bgImg={
                                            isLogin
                                                ? `url(${
                                                      process.env.REACT_APP_IP +
                                                      profileList.file
                                                  })`
                                                : 'none'
                                        }
                                    ></ProfileImage>
                                    {/* <img
                                src={`${
                                    process.env.REACT_APP_IP + profileList.file
                                }`}
                            /> */}
                                </ProfileCircle>
                                <FlexDiv
                                    column={true}
                                    justify="center"
                                    padding="0 0 0 10px;"
                                >
                                    <Nickname>
                                        {profileList.nickname}님
                                    </Nickname>
                                    <Nickname>좋은하루 되세요!</Nickname>
                                </FlexDiv>
                            </FlexDiv>
                            <FlexDiv column={true} justify="center">
                                <Countbox>분노일기 수</Countbox>
                                <Countbox>받은 쓰담수</Countbox>
                                <Countbox>내 쓰담수</Countbox>
                            </FlexDiv>
                            <FlexDiv column={true} justify="center">
                                <Countbox>{profileList.diaryCount}</Countbox>
                                <Countbox>
                                    {profileList.recieveTodakCount}
                                </Countbox>
                                <Countbox>
                                    {profileList.sendTodakCount}
                                </Countbox>
                            </FlexDiv>
                            <FlexDiv>로그인시간</FlexDiv>
                        </FlexDiv>
                    </>
                );
        }
    }, [status, isFetching]);

    useEffect(() => {});
    return (
        <>
            <Header title="마이페이지"></Header>
            <StyledWrap>
                {isLogin ? (
                    renderByStatus()
                ) : (
                    <FlexDiv>정보가 없습니다</FlexDiv>
                )}
            </StyledWrap>
        </>
    );
};
const StyledWrap = styled.div`
    background-color: #f6f6f6;
    display: flex;
    height: 247px;
`;
const ProfileCircle = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 60px;
    background-color: #4222b9;
    overflow: hidden;
    flex-shrink: 0;
`;
const ProfileImage = styled.div`
    background-image: ${props => props.bgImg};
    background-size: cover;
    width: 100%;
    height: 100%;
`;
const Nickname = styled.p`
    font-size: 24px;
    font-weight: 500;
`;
const Countbox = styled.p`
    font-size: 20px;
    font-weight: 700;
    background-color: #c4c4c4;
    margin: 6px;
`;
export default Mypage;

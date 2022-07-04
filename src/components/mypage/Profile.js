import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useProfile } from '../../hooks/useProfile';
import { AiOutlineCamera } from 'react-icons/ai';
import { tokenURL } from '../../Apis/API';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { FlexDiv } from '../../elements';

const Profile = props => {
    const isLogin = useSelector(state => state.member.isLogin);

    const {
        status,
        data: profileList,
        error,
        isFetching,
        refetch,
    } = useProfile();
    console.log(profileList);

    const ProfileImageMutation = useMutation(Data => {
        tokenURL.put(`/profile/image`, Data).then(res => {
            //프로필 갱신
            refetch();
        });
    });
    const handleFileInput = e => {
        const files = e.target.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        ProfileImageMutation.mutate(formData);
    };
    console.log(status);
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
                        <PageTitle>My page</PageTitle>
                        <div>
                            <FlexDiv padding="0px 0px 25% 0px">
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
                                    >
                                        <FloatInput>
                                            <AiOutlineCamera
                                                size="10px"
                                                style={{
                                                    position: 'absolute',
                                                    top: '6px',
                                                    left: '6px',
                                                }}
                                            ></AiOutlineCamera>
                                            <FileInput
                                                type="file"
                                                accept="image/x-png,image/jpeg"
                                                onChange={handleFileInput}
                                            ></FileInput>
                                        </FloatInput>
                                    </ProfileImage>
                                </ProfileCircle>

                                <FlexDiv
                                    column={true}
                                    justify="center"
                                    padding="0 0 0 0;"
                                >
                                    <Nickname>
                                        <NicknameBold>{profileList.nickname}</NicknameBold>님
                                    </Nickname>
                                    <Nickname>좋은하루 되세요!</Nickname>
                                    <EmailAddres>sdaf</EmailAddres>
                                </FlexDiv>
                            </FlexDiv>
                            <hr></hr>
                            <FlexDiv
                                padding="94px 0px 56px 0px"
                                column={true}
                                justify="space-between"
                            >
                                <FlexDiv
                                    padding="30px 30px 30px 0px"
                                    justify="space-between"
                                >
                                    <Countbox>분노 통장수</Countbox>
                                    <Counttext>
                                        {profileList.diaryCount} 개
                                    </Counttext>
                                </FlexDiv>
                                <FlexDiv
                                    padding="30px 30px 30px 0px"
                                    justify="space-between"
                                >
                                    <Countbox>받은 쓰담수</Countbox>
                                    <Counttext>
                                        {profileList.recieveTodakCount} 회
                                    </Counttext>
                                </FlexDiv>
                                <FlexDiv
                                    padding="30px 30px 30px 0px"
                                    justify="space-between"
                                >
                                    <Countbox>내 쓰담수</Countbox>
                                    <Counttext>
                                        {profileList.sendTodakCount} 회
                                    </Counttext>
                                </FlexDiv>
                                <FlexDiv
                                    padding="30px 30px 30px 0px"
                                    justify="space-between"
                                >
                                    <Countbox>마지막 로그인 시간</Countbox>
                                    <Counttext>
                                        2022/04/10
                                        <br />
                                        01:57PM
                                    </Counttext>
                                </FlexDiv>
                            </FlexDiv>
                        </div>
                    </>
                );
        }
    }, [status, isFetching]);
    return (
        <>
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
    background-color: black;
    padding: 0px 108px;
`;
const PageTitle = styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    padding-bottom: 98px;
`;
const FloatInput = styled.div`
    width: 23px;
    height: 23px;
    background-color: #da463c;
    color: #ffffff;
    box-sizing: border-box;
    font-size: 24px;
    font-weight: 800;
    position: absolute;
    left: 55px;
    top: 55px;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50px;
`;
const FileInput = styled.input`
    width: 54px;
    height: 54px;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50px;
    font-size: 45px;
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0;

    filter: alpha(opacity=0);
    -ms-filter: 'alpha(opacity=0)';
    -khtml-opacity: 0;
    -moz-opacity: 0;
`;
const ProfileCircle = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 60px;
    background-color: #c4c4c4;
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
    font-family: 'NotoSans-Medium';
`;

const NicknameBold = styled.span`
    font-size : 26px;
    font-weight: 900;
    font-family: 'NotoSans-Bold';
`;
const EmailAddres = styled.div`
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 13px;
    display: flex;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    justify-content: center;
`;
const CountWarp = styled.div`
    padding: 90px 0px 162px 0px;
    display: flex;
`;
const Countbox = styled.p`
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
`;
const Counttext = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
`;
export default Profile;

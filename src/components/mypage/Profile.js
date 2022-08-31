import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useProfile } from '../../hooks/useProfile';
import { AiOutlineCamera } from 'react-icons/ai';
import { tokenURL } from '../../Apis/API';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { FlexDiv } from '../../elements';
import moment from 'moment';

const Profile = props => {
    // const isLogin = useSelector(state => state.member.isLogin);
    const isLogin = localStorage.getItem('nickname') ? true : false;

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
                        <ProfileWrap>
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
                                    <NicknameBold>
                                        {profileList.nickname}
                                    </NicknameBold>
                                    님
                                </Nickname>
                                <Nickname>좋은하루 되세요!</Nickname>
                                <EmailAddres>{profileList?.email}</EmailAddres>
                            </FlexDiv>
                        </ProfileWrap>

                        <FlexDiv
                            padding="42px 0px 0px 0px"
                            column={true}
                            justify="space-between"
                        >
                            <FlexDiv
                                padding="0 15px 50px 0px"
                                justify="space-between"
                            >
                                <Countbox>게시글 수</Countbox>
                                <Counttext>
                                    {profileList.diaryCount} 개
                                </Counttext>
                            </FlexDiv>
                            <FlexDiv
                                padding="0 15px 50px 0px"
                                justify="space-between"
                            >
                                <Countbox>받은 쓰담수</Countbox>
                                <Counttext>
                                    {profileList.recieveTodakCount} 회
                                </Counttext>
                            </FlexDiv>
                            <FlexDiv
                                padding="0 15px 50px 0px"
                                justify="space-between"
                            >
                                <Countbox>내 쓰담수</Countbox>
                                <Counttext>
                                    {profileList.sendTodakCount} 회
                                </Counttext>
                            </FlexDiv>
                            <FlexDiv
                                padding="0 15px 50px 0px"
                                justify="space-between"
                            >
                                <Countbox>마지막 로그인 시간</Countbox>
                                <Counttext>
                                    {moment(profileList?.lastLogin).format(
                                        'YYYY/MM/DD',
                                    )}
                                    <br />

                                    {moment(profileList?.lastLogin).format(
                                        'h:mm a',
                                    )}
                                </Counttext>
                            </FlexDiv>
                        </FlexDiv>
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
    min-width: 327px;
    margin-right: 78px;
    margin-top: 50px;
`;
const ProfileWrap = styled.div`
    display: flex;
    padding: 73px 0 42px;
    border-bottom: solid 1px #737373;
    position: relative;
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
    left: 62px;
    top: 135px;
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
    width: 87px;
    height: 87px;
    border-radius: 60px;
    background-color: #813bf3;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 22px;
`;
const ProfileImage = styled.div`
    background-image: ${props => props.bgImg};
    background-size: cover;
    width: 100%;
    height: 100%;
`;
const Nickname = styled.p`
    font-weight: 400;
    font-size: 28px;
    line-height: 41px;
    color: #282828;
`;

const NicknameBold = styled.span`
    font-weight: 700;
    font-size: 28px;
    line-height: 41px;
    color: #282828;
`;
const EmailAddres = styled.div`
    border: 1px solid #737373;
    box-sizing: border-box;
    border-radius: 13px;
    display: flex;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    justify-content: center;
    color: #737373;
    margin-top: 8px;
`;
const CountWarp = styled.div`
    padding: 90px 0px 162px 0px;
    display: flex;
`;
const Countbox = styled.p`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
`;
const Counttext = styled.p`
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: #737373;
`;
export default Profile;

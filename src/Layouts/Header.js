import React, { startTransition, useEffect, useState } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useIsMount from '../hooks/useIsMount';
import { getnotis } from '../redux/modules/notification';

import Notifications from '../components/Notifications';

const Header = props => {

    const [notimmodal, setNotimodal] = useState(false);
    const dispatch = useDispatch();
    const lastnotiId = useSelector(state => state.noti.lastnotiId);
    const profileList = useSelector(state => state.member.user_info);
    const isLogin = useSelector(state => state.member.isLogin);
    // console.log(profileList);
    // console.log(process.env.REACT_APP_IP + profileList.file);

    return (
        <>
            <HeaderWrap>
                <HeaderIcon
                    onClick={() => {
                        setNotimodal(true);
                    }}
                >
                    <BsFillBellFill
                        size="20px"
                        style={{ cursor: 'pointer' }}
                    />
                </HeaderIcon>
                <HeaderIcon>
                    <ProfileCircle>
                        <ProfileImage
                            bgImg={
                                isLogin && profileList.file
                                    ? `url(${
                                          process.env.REACT_APP_IP +
                                          profileList.file
                                      })`
                                    : 'none'
                            }
                        ></ProfileImage>
                    </ProfileCircle>
                </HeaderIcon>
            </HeaderWrap>
            {notimmodal && (
                <Notifications
                    notimmodal={notimmodal}
                    setNotimodal={setNotimodal}
                    lastnotiId={lastnotiId}
                />
            )}
        </>
    );
};

const HeaderWrap = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 5vw;
`;
const HeaderIcon = styled.div`
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
const ProfileCircle = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 36px;
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
export default Header;

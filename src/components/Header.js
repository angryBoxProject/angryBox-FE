import React, { startTransition, useEffect, useState } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useIsMount from '../hooks/useIsMount';
import { getnotis } from '../redux/modules/notification';

import Notifications from './Notifications';

const Header = props => {
    const { title } = props;

    const [notimmodal, setNotimodal] = useState(false);
    const dispatch = useDispatch();
    const lastnotiId = useSelector(state => state.noti.lastnotiId);
    const profileList = useSelector(state => state.member.user_info);
    const isLogin = useSelector(state => state.member.isLogin);
    // console.log(profileList);
    // console.log(process.env.REACT_APP_IP + profileList.file);

    return (
        <>
            <div className="flex justify-end h-20">
                <div>
                    <BsFillBellFill
                        size="20px"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setNotimodal(true);
                        }}
                    />
                </div>
                <div>
                    {/* <ProfileCircle>
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
                    </ProfileCircle> */}
                </div>
            </div>
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
export default Header;

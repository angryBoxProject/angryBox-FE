import React, { startTransition, useEffect, useState } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useIsMount from '../hooks/useIsMount';
import { getnotis } from '../redux/modules/notification';
import Notifications from '../components/Notifications';
import { ReactComponent as MainIcon } from '../static/image/header/nav_main_icon.svg';
import { ReactComponent as MainIconOn } from '../static/image/header/nav_main_icon_on.svg';
import { ReactComponent as CommunityIcon } from '../static/image/header/nav_community_icon.svg';
import { ReactComponent as CommunityIconOn } from '../static/image/header/nav_community_icon_on.svg';
import { ReactComponent as StatisticIcon } from '../static/image/header/nav_statistic_icon.svg';
import { ReactComponent as StatisticIconOn } from '../static/image/header/nav_statistic_icon_on.svg';
import { ReactComponent as MypageIcon } from '../static/image/header/nav_mypage_icon.svg';
import { ReactComponent as MypageIconOn } from '../static/image/header/nav_mypage_icon_on.svg';
import { ReactComponent as BellIcon } from '../static/image/header/nav_bell_icon.svg';
const Header = props => {
    
    const [notimmodal, setNotimodal] = useState(false);
    const dispatch = useDispatch();
    const lastnotiId = useSelector(state => state.noti.lastnotiId);
    const profileList = useSelector(state => state.member.user_info);
    const isLogin = useSelector(state => state.member.isLogin);
    // console.log(profileList);
    // console.log(process.env.REACT_APP_IP + profileList.file);
    const pathName = window.location.pathname;

    return (
        <>
            <HeaderWrap>
                <Logo
                    onClick={() => {
                    }}
                >
                    RAGE BANK
                </Logo>

                <Nav>
                    <NavLink
                        reloadDocument
                        to="/new/main"
                    > 
                        <NavItem>
                            {pathName === "/new/main" ? <MainIconOn /> : <MainIcon />}
                        </NavItem>
                    </NavLink>
                    <NavLink
                        reloadDocument
                        to="/new/community/"
                    > 
                        <NavItem>
                            {pathName === "/new/community/" || pathName === "/new/community/best" || pathName === "/new/community/recent" || pathName === "/new/community/gallery" ? <CommunityIconOn /> : <CommunityIcon />}
                        </NavItem>
                    </NavLink>
                    <NavLink
                        reloadDocument
                        to="/new/statistic"
                    > 
                        <NavItem>
                            {pathName === "/new/statistic" ? <StatisticIconOn /> : <StatisticIcon />}
                        </NavItem>
                    </NavLink>
                    <NavLink
                        reloadDocument
                        to="/new/mypage"
                    > 
                        <NavItem>
                            {pathName === "/new/mypage" ? <MypageIconOn /> : <MypageIcon />}
                        </NavItem>
                    </NavLink>
                </Nav>

                <Util>
                    <UtilItem><BellIcon /></UtilItem>
                    
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
                </Util>

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
    max-width: 1388px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
`;

const Logo = styled.div`
    font-size: 24px;
    line-height: 29px;
    color: #813BF3;
    font-family: 'Montserrat-ExtraBold';
    font-style: normal;
`;

const Nav = styled.ul`
    width: 246px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
    const NavItem = styled.li`
        width: 48px;
        height: 48px;
    `;

const Util = styled.div`
    width: 125px;
    display: flex;
    align-items: center;
`;
    const UtilItem = styled.div`
        width: 64px;
        height: 64px;
    `;
    const HeaderIcon = styled.div`
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
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

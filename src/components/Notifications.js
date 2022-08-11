import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
import { BsFillBellFill } from 'react-icons/bs';
import { useNotification } from '../hooks/useNoti';
import { useDispatch, useSelector } from 'react-redux';
import Noti from './Noti';
import { getnotis } from '../redux/modules/notification';
import useIsMount from '../hooks/useIsMount';
import { ReactComponent as BellIcon } from '../static/image/header/nav_bell_icon_on.svg';

const Notifications = props => {
    const { notilist, listloading, hasMorePosts } = useSelector(
        state => state.noti,
    );
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const isMount = useIsMount();
    
    const profileList = useSelector(state => state.member.user_info);
    const isLogin = useSelector(state => state.member.isLogin);

    useEffect(() => {
        dispatch(getnotis(props.lastnotiId));
    }, []);
    // const {
    //     status,
    //     data: notilistquery,
    //     error,
    //     isFetching,
    // } = useNotification(lastnotiId, hasMorePosts);
    useEffect(() => {
        function onScroll() {
            const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;
            if (clientHeight + scrollTop > scrollHeight - 300) {
                if (
                    hasMorePosts &&
                    notilist &&
                    !listloading &&
                    isMount.current
                ) {
                    dispatch(getnotis(props.lastnotiId));
                }
            }
        }
        scrollRef.current.addEventListener('scroll', onScroll);
        return () => {
            scrollRef.current.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, notilist, listloading, isMount]);

    // const renderByStatus = useCallback(() => {
    //     switch (status) {
    //         case 'loading':
    //             return <div>loading</div>;
    //         case 'error':
    //             if (error instanceof Error) {
    //                 return <span>Error: {error.message}</span>;
    //             }
    //             break;
    //         default:
    //             return <></>;
    //     }
    // }, [status, isFetching]);
    return (
        <Wrap ref={scrollRef}>
            <Util>
                <UtilItem onClick={() => props.setNotimodal(false)}><BellIcon /></UtilItem>
                
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
            <Container>
                <Title>알림</Title>
                <NotiWrap>
                    {notilist?.map((data, index) => (
                        <Noti
                            key={index}
                            notiid={data.id}
                            diaryId={data.diaryId}
                            checked={data.checked}
                            content={data.content}
                            dateTime={data.dateTime}
                            receiveMemberId={data.receiveMemberId}
                            sendMemberId={data.sendMemberId}
                        />
                    ))}
                </NotiWrap>
            </Container>
            {/* <Section
                onClick={() => {
                    props.setNotimodal(false);
                }}
            >
                <Modaltap ref={scrollRef}>
                    <Notiheader>
                        <BsFillBellFill size="20px" />
                        <div>프로필 url</div>
                    </Notiheader>
                    <MainModal>알림</MainModal>
                    
                    {notilist?.map((data, index) => (
                        <Noti
                            key={index}
                            notiid={data.id}
                            diaryId={data.diaryId}
                            checked={data.checked}
                            content={data.content}
                            dateTime={data.dateTime}
                            receiveMemberId={data.receiveMemberId}
                            sendMemberId={data.sendMemberId}
                        />
                    ))}
                </Modaltap>
            </Section> */}
        </Wrap>
    );
};
const Wrap = styled.div`
    width: 421px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background: #813BF3;
    z-index: 5;
    padding: 18px 30px;
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
const Container = styled.div`
    width: 200px;
    padding-left: 20px;
`;
const Title = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #FFFFFF;
    padding-top: 40px;
    padding-bottom: 55px;
`;
const NotiWrap = styled.div`
    width: 100%;
    height: 70vh;
    overflow: auto;
    padding-right: 10px;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    
    ::-webkit-scrollbar {
        //display: none; /* Chrome , Safari , Opera */
        width: 5px;
        background-color: #F6F6F6;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #F6F6F6;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background-color: #813BF3;
        border-radius: 5px;
    }
`;
export default Notifications;

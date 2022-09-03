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
import { ReactComponent as BellIcon2 } from '../static/image/header/nav_bell_icon_non.svg';

import { tokenURL } from '../Apis/API';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from '../shared/utils/Cookie';
import { removeLogout } from '../redux/modules/member';
import ModalPostDetail from './Modal/ModalPostDetail';
import { useInView } from 'react-intersection-observer';

const Notifications = props => {
    const { notilist, listloading, hasMorePosts } = useSelector(
        state => state.noti,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollRef = useRef();
    const isMount = useIsMount();

    const profileList = useSelector(state => state.member.user_info);
    const isLogin = useSelector(state => state.member.isLogin);
    const [modalPost, setModalPost] = useState();
    const [statuss, setStatus] = useState('view');

    //scroll
    const [ref, inView] = useInView();
    const [notisList, setNotisList] = useState([]);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);

    const getList = useCallback(async () => {
        setLoading(true);
        const data = {
            startDate: '',
            endDate: '',
            imageFilter: 2,
            angry: [],
        };
        await tokenURL.get(`/notification/${lastId}/20`).then(res => {
            const list = res.data.data.ntfList;
            setNotisList(prevState => [...prevState, ...list]);
        });
        setLoading(false);
    }, [lastId]);

    useEffect(() => {
        getList();
    }, [getList]);
    useEffect(() => {
        if (inView && !loading) {
            setLastId(prevState => prevState + 10);
        }
    }, [inView, loading]);
    useEffect(() => {
        // dispatch(getnotis(props.lastnotiId));
    }, []);

    const logOutHandle = async () => {
        await tokenURL.post(`auth/logout`).then(res => {
            deleteCookie('token');
            localStorage.removeItem('nickname');
            localStorage.removeItem('memberId');
            dispatch(removeLogout());
            navigate('/', { replace: true });
        });
        navigate('/', { replace: true });
    };

    return (
        <div>
            <WrapOut onClick={() => props.setNotimodal(false)}></WrapOut>
            {/* <Wrap ref={scrollRef} onClick={() => props.setNotimodal(false)}> */}
            <Wrap>
                <Util>
                    <UtilItem>
                        {/* <BellIcon /> */}
                        {props?.notiCheck?.unCheckedNftCount === 0 ? (
                            <BellIcon2 fill="#F6F6F6" />
                        ) : (
                            <BellIcon />
                        )}
                    </UtilItem>

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
                    <LogoutDiv onClick={logOutHandle}>
                        <LogOutBtn>
                            <LogoutButtonText>logout</LogoutButtonText>
                        </LogOutBtn>
                    </LogoutDiv>
                </Util>
                <Container>
                    <Title>알림</Title>
                    {notisList && (
                        <NotiWrap>
                            {notisList?.map((data, index) => (
                                <Noti
                                    ref={
                                        notisList?.length - 1 == index
                                            ? ref
                                            : null
                                    }
                                    key={index}
                                    notiid={data.id}
                                    diaryId={data.diaryId}
                                    checked={data.checked}
                                    content={data.content}
                                    dateTime={data.dateTime}
                                    receiveMemberId={data.receiveMemberId}
                                    sendMemberId={data.sendMemberId}
                                    setModalPost={setModalPost}
                                />
                            ))}
                        </NotiWrap>
                    )}
                </Container>
                {modalPost && (
                    <ModalPostDetail
                        id={modalPost}
                        title="분노 게시글"
                        modalType="form"
                        status={statuss}
                        setStatus={setStatus}
                        isnoti={true}
                        close={() => {
                            setModalPost(null);
                        }}
                    />
                )}
            </Wrap>
        </div>
    );
};
const WrapOut = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 4;
`;
const Wrap = styled.div`
    width: 421px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background: #813bf3;
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
const LogoutDiv = styled.div`
    width: 88px;
    height: 64px;
    top: 40px;
    right: 68px;
    display: flex;
    position: absolute;
    /* align-items: center;
    justify-content: flex-end; */
`;

const LogOutBtn = styled.button`
    width: 100%;
    max-width: 436px;
    height: 46px;
    border: solid 3px #ffffff;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;
const LogoutButtonText = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    color: #ffffff;
    margin-right: 1px;
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
    width: 100%;
    padding-left: 20px;
`;
const Title = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #ffffff;
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
        background-color: #f6f6f6;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #f6f6f6;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background-color: #813bf3;
        border-radius: 5px;
    }
`;
export default Notifications;

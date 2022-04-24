import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
import { BsFillBellFill } from 'react-icons/bs';
import { useNotification } from '../hooks/useNoti';
import { useDispatch, useSelector } from 'react-redux';
import Noti from './Noti';
import { getnotis } from '../redux/modules/notification';
import useIsMount from '../hooks/useIsMount';

const Notifications = props => {
    const { notilist, listloading, hasMorePosts } = useSelector(
        state => state.noti,
    );
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const isMount = useIsMount();
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
        <>
            <Section
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
                    {/* {renderByStatus()} */}
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
            </Section>
        </>
    );
};
const Section = styled.div`
    position: absolute;
    top: 0;
    box-sizing: border-box;
    width: 80%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Notiheader = styled.div`
    //헤더쪽 알림하고 맞출것
    display: flex;
    justify-content: flex-end;
`;
const Modaltap = styled.div`
    position: absolute;
    right: 0;
    width: 20%;
    height: 100%;
    background-color: ${theme.color.black};
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Chrome , Safari , Opera */
    }
`;
const MainModal = styled.div`
    padding: 45px;
`;
export default Notifications;

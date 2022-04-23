import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
import { BsFillBellFill } from 'react-icons/bs';
import { useNotification } from '../hooks/useNoti';
import { useSelector } from 'react-redux';

const Notifications = props => {
    const lastnotiId = useSelector(state => state.noti.lastnotiId);

    const { status, data: notilist, error, isFetching } = useNotification(1);
    console.log(notilist);

    return (
        <>
            <Section
                onClick={() => {
                    props.setNotimodal(false);
                }}
            >
                <Modaltap>
                    <Notiheader>
                        <BsFillBellFill size="20px" />
                        <div>프로필 url</div>
                    </Notiheader>
                    <MainModal>알림</MainModal>
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
`;
const MainModal = styled.div`
    padding: 45px;
`;
export default Notifications;

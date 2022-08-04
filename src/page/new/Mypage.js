import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlexDiv } from '../../elements';
import { useNavigate } from 'react-router-dom';

import Profile from '../../components/mypage/Profile';
import NewPw from '../../components/mypage/NewPw';

import MainLayout from '../../Layouts/MainLayout';
import Contents from '../../Layouts/Contents';
const Mypage = props => {
    // const email = useSelector(state => state.member.user_info.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newpw, setNewPw] = useState('');
    const [openpw, setOpenpw] = useState(true);

    useEffect(() => {});
    return (
        <MainLayout nav={true}>
            <Contents header={true}>
                <PageWarp>
                    <Profile />
                    <NewPw />
                </PageWarp>
            </Contents>
        </MainLayout>
    );
};
const PageWarp = styled.div`
    display: flex;
`;

export default Mypage;

import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FlexDiv } from '../elements';
import { useNavigate } from 'react-router-dom';

import Profile from '../components/mypage/Profile';
import NewPw from '../components/mypage/NewPw';

const Mypage = props => {
    // const email = useSelector(state => state.member.user_info.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newpw, setNewPw] = useState('');
    const [openpw, setOpenpw] = useState(true);

    useEffect(() => {});
    return (
        <>
            <PageWarp>
                <div style={{ width: '50%' }}>
                    <Profile />
                </div>
                <div style={{ width: '50%' }}>
                    <Button
                        width="104px"
                        padding="9px"
                        onClick={() => {
                            setOpenpw(true);
                        }}
                    >
                        비밀번호
                    </Button>
                    <Button
                        abled
                        width="104px"
                        padding="9px"
                        onClick={() => {
                            //클릭이벤트
                        }}
                    >
                        분노 저금통
                    </Button>
                    {openpw && (
                        <div
                            style={{
                                paddingTop: '70px',
                                backgroundColor: 'black',
                            }}
                        >
                            <NewPw />
                        </div>
                    )}
                </div>
            </PageWarp>
        </>
    );
};
const PageWarp = styled.div`
    background-color: black;
    display: flex;
    height: calc(100vh - 80px);
`;
const StyledWrap = styled.div`
    background-color: black;
    padding: 0px 108px;
`;

export default Mypage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainLayout from '../../Layouts/MainLayout';
import Contents from '../../Layouts/Contents';

const Splash = () => {
    const navigate = useNavigate();

    return (
        <Contents header={false}>
            <FixedCenter>
                <Title>분노를 모아<br/>목돈을 마련해보세요</Title>
                <Logo>RAGE BANK</Logo>
                <Button
                    onClick={() => {
                        navigate('/new/login');
                    }}
                >
                    시작하기
                </Button>
            </FixedCenter>
        </Contents>
    );
};
const FixedCenter = styled.div`
    position: relative;
    top: 50vh;
    transform: translate(0, -50%);
`
const Title = styled.div`
    font-weight: 700;
    font-size: 60px;
    line-height: 87px;
    text-align: center;
    color: #282828;
    margin-bottom: 38px;
`;
const Logo = styled.div`
    font-family: 'Montserrat-ExtraBold';
    font-style: normal;
    font-weight: 800;
    font-size: 52px;
    line-height: 63px;
    text-align: center;
    color: #813BF3;
    margin-bottom: 38px;
`
const Button = styled.button`
    width: 187px;
    height: 60px;
    border: solid 3px #813BF3;
    border-radius: 30px;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    color: #813BF3;
    margin: 0 auto;
    display: block;
`

export default Splash;

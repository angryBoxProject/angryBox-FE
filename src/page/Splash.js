import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, FlexDiv } from '../elements';
// import { ReactComponent as Fire } from '../../static/image/Fire.svg';
import { ReactComponent as Fire } from '../static/image/Fire.svg';
import theme from '../Styles/theme';

const Splash = () => {
    const navigate = useNavigate();

    return (
        <Warp>
            <SplashImage>
                <Fire style={{ width: '100%', height: '100%' }} />
            </SplashImage>
            <Title>분노 저금통</Title>
            <Button
                width="50%"
                onClick={() => {
                    navigate('/login');
                }}
            >
                로그인
            </Button>
        </Warp>
    );
};
const Warp = styled.div`
    display: flex;
    position: fixed;
    z-index: 99999999;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    left: 0%;
    top: 0%;
    width: 100vw;
    height: 100vh;
    background-color: ${theme.color.black};
`;
const SplashImage = styled.div`
    background-color: ${theme.color.black};
    width: 500px;
    height: 500px;
    border-radius: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Title = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 80px;
    line-height: 123px;
    /* identical to box height */

    color: ${theme.color.red};
`;

export default Splash;

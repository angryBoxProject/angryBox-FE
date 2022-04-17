import React from 'react';
import styled from 'styled-components';

const SocialLogin = props => {
    //kakao
    const REDIRECT_URI = `${process.env.REACT_APP_URL}oauth2/kakao/callback`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <div>
            <KaKaoBtn href={KAKAO_AUTH_URL}>카카오</KaKaoBtn>
        </div>
    );
};

export default SocialLogin;
const KaKaoBtn = styled.a`
    width: 420px;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 56px;
    background: #221d7e;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 26px;
    color: #ffffff;

    cursor: pointer;
    &:hover {
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
    }
`;

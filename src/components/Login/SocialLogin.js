import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { ReactComponent as Kakaologo } from '../../static/image/KakaoTalk_logo.svg';




const SocialLogin = props => {
    //kakao
    const REDIRECT_URI = `${process.env.REACT_APP_URL}oauth2/kakao/callback`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    //Google
    const GoogleId = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
    const GoogleREDIRECT_URI = `${process.env.REACT_APP_URL}oauth2/google/callback`;

    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&response_type=code&state=security_token%3D138r5719ru3e1%26url%3Dhttps://oauth2.example.com/token&client_id=${GoogleId}&redirect_uri=${GoogleREDIRECT_URI}`;
    const onSuccessGoogle = res => {
        console.log(res);
    };
    const onFailure = res => {
        alert('구글 로그인에 실패하였습니다');
        console.log('err', res);
    };
    return (
        <div>
            <KaKaoBtn href={KAKAO_AUTH_URL}><Kakaologo/></KaKaoBtn>
            {/* <KaKaoBtn href={GOOGLE_AUTH_URL}>구글</KaKaoBtn>
            <GoogleLogin
                buttonText="Login with Google"
                clientId={GoogleId}
                onSuccess={onSuccessGoogle}
                onFailure={onFailure}
            ></GoogleLogin> */}
        </div>
    );
};

export default SocialLogin;
const KaKaoBtn = styled.a`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
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

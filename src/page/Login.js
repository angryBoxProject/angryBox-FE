import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

import { Button, Input, InputNoTitle } from '../elements';
import { login } from '../redux/modules/member';
import SocialLogin from '../components/Login/SocialLogin';
import Contents from '../Layouts/Contents';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [pw, setpw] = useState();

    const data = {
        email: email,
        password: pw,
    };
    //query테스트

    // const queryClient = useQueryClient();
    // const loginMutation = useMutation(Data => {
    //     URL.post(`auth/login`, Data).then(res => {
    //         queryClient.setQueryData(['login'], res);
    //         navigate('/main');
    //         console.log(res);
    //     });
    // });
    //엔터 입력시
    const handleKeyDownSendMessage = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            loginhandle();
        }
    };
    const loginhandle = () => {
        if (email === '' || pw === '') {
            window.alert('내용을 모두 입력해주세요');
            return;
        }
        //query테스트
        // loginMutation.mutate(data);

        dispatch(login({ data, navigate }));
    };
    return (
        <Contents header={false}>
            <LoginBox>
                <LogoBox>ANGRY BANK</LogoBox>
                <WrapBox>
                    <div className="flex flex-col mt-11">
                        <InputNoTitle
                            cardSize="2"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            placeholder="이메일"
                        />
                        <InputNoTitle
                            cardSize="2"
                            type="password"
                            onChange={e => {
                                setpw(e.target.value);
                            }}
                            value={pw}
                            placeholder="비밀번호"
                            onKeyDown={handleKeyDownSendMessage}
                        />
                        <Button size="3" onClick={loginhandle}>
                            로그인하기
                        </Button>
                        <UtilWrap>
                            <SocialLogin />
                            <Auth>
                                <GoSignup onClick={() => {}}>회원가입</GoSignup>
                                <FindPwd onClick={() => {}}>비밀번호 찾기</FindPwd>
                            </Auth>
                        </UtilWrap>
                    </div>
                </WrapBox>
            </LoginBox>
        </Contents>
    );
};

const LoginBox = tw.div`
flex flex-col p-3 justify-center items-center h-screen
`;

const LogoBox = styled.div`
    font-weight: 700;
    font-size: 45px;
    line-height: 47px;
    text-align: center;
    color: #DA463C;
    font-family: 'Hanson';
`;

const WrapBox = styled.div`
    width: 632px;
`;

const UtilWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 27px;
`;

const Auth = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #F6F6F6;
`;

const GoSignup = styled.div`
    padding: 0 20px;
    border-right: solid 1px #505050;
`
const FindPwd = styled.div`
    padding: 0 20px;
`

export default Login;

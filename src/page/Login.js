import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

import { Button, Input, InputNoTitle } from '../elements';
import { login } from '../redux/modules/member';
import SocialLogin from '../components/Login/SocialLogin';

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
        <>
            <LoginBox>
                로그인
                <div className="col-start-2 col-end-5 xl:grid">
                    가입하신 이메일 주소로 로그인하세요
                    <div className="flex flex-col mt-10">
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
                            로그인
                        </Button>
                        <SocialLogin />
                        <button className="bg-yellow-400">카카오로그인</button>
                        <button className="bg-yellow-100">구글로그인</button>
                    </div>
                </div>
            </LoginBox>
        </>
    );
};

const LoginBox = tw.div`
flex flex-col p-3 justify-center items-center
`;

export default Login;

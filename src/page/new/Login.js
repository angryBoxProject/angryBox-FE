import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

import { login } from '../../redux/modules/member';
import SocialLogin from '../../components/Login/SocialLogin';
import Contents from '../../Layouts/Contents';
import { URL } from '../../Apis/API';
import ModalFindPw from '../../components/Modal/ModalFindPw';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [pw, setpw] = useState();

    const [findpw, setFindpw] = useState();
    const [modalfindpw, setModalFindPw] = useState(false);

    const testfindpw = async () => {
        await URL.put(
            `/user/pw?email=${findpw}`,
            { email: findpw },
            // { params: { email: findpw } },
        ).then(res => {
            console.log(res);
        });
    };

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
            <FixedCenter>
                <Logo>RAGE BANK</Logo>
                <InputLogin
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    placeholder="이메일"
                />
                <InputLogin
                    type="password"
                    onChange={e => {
                        setpw(e.target.value);
                    }}
                    value={pw}
                    placeholder="비밀번호"
                    onKeyDown={handleKeyDownSendMessage}
                />
                <Button onClick={loginhandle}>로그인하기</Button>
                <UtilWrap>
                    <SocialLogin />
                    <Auth>
                        <GoSignup
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/new/signup');
                            }}
                        >
                            회원가입
                        </GoSignup>
                        <GoSignup>{'  |  '}</GoSignup>
                        <GoSignup
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setModalFindPw(true);
                            }}
                        >
                            비밀번호 찾기
                        </GoSignup>
                        {/* <FindPwd onClick={() => {}}>비밀번호 찾기</FindPwd> */}
                    </Auth>
                </UtilWrap>
            </FixedCenter>
            {modalfindpw && (
                <ModalFindPw
                    close={() => {
                        setModalFindPw(false);
                    }}
                />
            )}
        </Contents>
    );
};

const FixedCenter = styled.div`
    max-width: 632px;
    position: relative;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Logo = styled.div`
    font-family: 'Montserrat-ExtraBold';
    font-style: normal;
    font-weight: 800;
    font-size: 52px;
    line-height: 63px;
    text-align: center;
    color: #813bf3;
    margin-bottom: 41px;
`;
const Button = styled.button`
    width: 100%;
    height: 60px;
    border: solid 3px #813bf3;
    border-radius: 30px;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    color: #813bf3;
    margin: 0 auto;
    display: block;
`;
const InputLogin = styled.input`
    width: 100%;
    height: 60px;
    background: #ececec;
    color: #737373;
    margin-bottom: 18px;
    padding: 15px 20px 16px;
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
    color: #f6f6f6;
`;

const GoSignup = styled.div`
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    color: #737373;
`;

export default Login;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { signup } from '../../redux/modules/member';

import Contents from '../../Layouts/Contents';

const SignUp = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [nickname, setNickname] = useState();
    const [pw, setpw] = useState();
    const [pwcheck, setPwCheck] = useState();

    const data = {
        email: email,
        password: pw,
        nickname: nickname,
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
    const loginhandle = () => {
        if (email === '' || pw === '' || pwcheck === '' || nickname === '') {
            window.alert('내용을 모두 입력해주세요');
            return;
        }
        if (pw !== pwcheck) {
            window.alert('비밀번호가 같지 않습니다.');
            return;
        }
        //query테스트
        // loginMutation.mutate(data);

        dispatch(signup({ data, navigate }));
    };
    return (
        <Contents header={false}>
            <FixedCenter>
                <Title>회원가입</Title>
                <SubTitle>가입하신 이메일 주소로 로그인하세요</SubTitle>

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
                />
                <InputLogin
                    type="password"
                    onChange={e => {
                        setPwCheck(e.target.value);
                    }}
                    value={pwcheck}
                    placeholder="비밀번호 확인"
                />
                <InputLogin
                    onChange={e => {
                        setNickname(e.target.value);
                    }}
                    value={nickname}
                    placeholder="닉네임"
                />
                <Button onClick={loginhandle}>회원가입</Button>
            </FixedCenter>
        </Contents>
    );
};
const FixedCenter = styled.div`
    max-width: 350px;
    position: relative;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Title = styled.div`
    text-align: center;
    font-weight: 700;
    font-size: 32px;
    line-height: 46px;
    color: #813bf3;
    margin-bottom: 17px;
`;
const SubTitle = styled.div`
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    color: #737373;
    margin-bottom: 41px;
`;
const InputLogin = styled.input`
    width: 100%;
    height: 60px;
    background: #ececec;
    color: #737373;
    margin-bottom: 18px;
    padding: 15px 20px 16px;
    margin-bottom: 31px;
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
export default SignUp;

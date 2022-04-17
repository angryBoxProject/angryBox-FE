import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, InputNoTitle } from '../elements';

import tw from 'tailwind-styled-components';
import { signup } from '../redux/modules/member';

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

        dispatch(signup(data, navigate));
    };
    return (
        <>
            <LoginBox>
                회원가입
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
                        />
                        <InputNoTitle
                            cardSize="2"
                            type="password"
                            onChange={e => {
                                setPwCheck(e.target.value);
                            }}
                            value={pwcheck}
                            placeholder="비밀번호 확인"
                        />
                        <InputNoTitle
                            cardSize="2"
                            onChange={e => {
                                setNickname(e.target.value);
                            }}
                            value={nickname}
                            placeholder="닉네임"
                        />
                        <Button size="3" onClick={loginhandle}>
                            회원가입
                        </Button>
                    </div>
                </div>
            </LoginBox>
        </>
    );
};
const LoginBox = tw.div`
flex flex-col p-3 justify-center items-center
`;
export default SignUp;

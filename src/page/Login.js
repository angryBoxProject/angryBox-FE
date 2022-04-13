import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../recoil';
const Login = () => {
    const user = useRecoilValue(userState);
    console.log(user);
    return (
        <>
            <div>Login</div>
        </>
    );
};

export default Login;

import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../recoil';
const Main = () => {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    const testServer = async () => {
        setUser(temp => temp.concat('test'));
        try {
            console.log('axios');
            const data = await axios
                .get('https://angrybox.link/hello')
                .then(res => console.log(res));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(user);
    return (
        <>
            <div>test</div>
            <button className="bg-slate-500" onClick={testServer}>
                testButton
            </button>
            <button
                className="bg-slate-500"
                onClick={() => {
                    navigate('/login');
                }}
            >
                testButton2
            </button>
        </>
    );
};

export default Main;

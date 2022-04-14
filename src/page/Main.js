import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../redux/modules/member';
const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const memberNick = useSelector(state => state.member.nickname);
    const testServer = async () => {
        dispatch(setUserName('test'));
        // try {
        //     console.log('axios');
        //     const data = await axios
        //         .get('https://angrybox.link')
        //         .then(res => console.log(res));
        //     console.log(data);
        // } catch (error) {
        //     console.log(error);
        // }
    };
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

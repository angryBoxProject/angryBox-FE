import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../redux/modules/member';
const Splash = () => {
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

export default Splash;

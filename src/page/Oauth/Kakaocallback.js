import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../elements';
import { kakaoLogin } from '../../redux/modules/member';

const Kakaocallback = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');
    useEffect(() => {
        dispatch(kakaoLogin({ code, navigate }));
    }, [dispatch]);
    return (
        <>
            <Spinner></Spinner>
        </>
    );
};

export default Kakaocallback;

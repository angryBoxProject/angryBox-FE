import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../elements';
import { googleLogin } from '../../redux/modules/member';

const Googlecallback = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');
    useEffect(() => {
        // dispatch(googleLogin({ code, navigate }));
    }, [dispatch]);
    return (
        <>
            <Spinner></Spinner>
        </>
    );
};

export default Googlecallback;

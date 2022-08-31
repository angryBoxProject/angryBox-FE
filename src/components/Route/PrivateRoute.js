import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../../shared/utils/Cookie';

function PrivateRoute({ authenticated, component: Component }) {
    return isLogin() ? (
        Component
    ) : (
        <Navigate to="/" {...alert('로그인이 필요합니다.')} />
    );
}

export default PrivateRoute;

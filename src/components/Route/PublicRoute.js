import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isLogin } from '../../shared/utils/Cookie';

const PublicRoute = ({ authenticated, component: Component, restricted }) => {
    return isLogin() && restricted ? (
        // restricted = false meaning public route
        // restricted = true meaning restricted route

        <Navigate to="/new/main" />
    ) : (
        Component
    );
};

export default PublicRoute;

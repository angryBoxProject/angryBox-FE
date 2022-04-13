import './App.css';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

//나중에 lazy로딩 사용하기전
// import Main from './page/Main';
// import Login from './page/Login';

const Main = lazy(() => import('./page/Main'));
const Login = lazy(() => import('./page/Login'));

function App() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/main" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;

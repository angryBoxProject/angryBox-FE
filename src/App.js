import './App.css';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

//나중에 lazy로딩 사용하기전
import Main from './page/Main';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Nav from './components/Nav';
import Kakaocallback from './page/Oauth/Kakaocallback';

// const Main = lazy(() => import('./page/Main'));
// const Login = lazy(() => import('./page/Login'));
// const SignUp = lazy(() => import('./page/SignUp'));
// const Nav = lazy(() => import('./components/Nav'));

function App() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <StyledWrap>
                    <Nav />
                    <Warp>
                        <Routes>
                            <Route path="/main" element={<Main />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/oauth2/kakao/callback"
                                element={<Kakaocallback />}
                            />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </Warp>
                </StyledWrap>
            </Suspense>
        </>
    );
}

const StyledWrap = styled.div`
    width: 100%;
    display: flex;
`;
const Warp = styled.div`
    width: 100%;
    padding-left: 20%;
`;
export default App;

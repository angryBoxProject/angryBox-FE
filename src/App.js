import './App.css';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import theme from './Styles/theme';

//나중에 lazy로딩 사용하기전
//page
import Main from './page/Main';
import Login from './page/Login';
import Kakaocallback from './page/Oauth/Kakaocallback';
import Googlecallback from './page/Oauth/Googlecallback';
import SignUp from './page/SignUp';
import Nav from './shared/Nav';
import Mypage from './page/Mypage';

import { useDispatch } from 'react-redux';
import { getCookie } from './shared/utils/Cookie';
import { setLogin } from './redux/modules/member';
import Header from './components/Header';
import Bamboo from './page/Bamboo';
import BambooRealTimeDiary from './components/bamboo/BambooRealTimeDiary';
import BambooTopDiary from './components/bamboo/BambooTopDiary';
import AngryBook from './page/AngryBook';

// const Main = lazy(() => import('./page/Main'));
// const Login = lazy(() => import('./page/Login'));
// const SignUp = lazy(() => import('./page/SignUp'));
// const Nav = lazy(() => import('./components/Nav'));

function App() {
    const dispatch = useDispatch();
    const mytoken = getCookie('token');

    useEffect(() => {
        if (mytoken) {
            dispatch(setLogin());
        }
    }, [mytoken, dispatch]);
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <StyledWrap>
                    <Nav />
                    <Warp>
                        <Header title="헤더 "></Header>
                        <Routes>
                            <Route path="/main" element={<Main />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/mypage" element={<Mypage />} />
                            <Route path="/bamboo" element={<Bamboo />} />
                            <Route path="/angrybook" element={<AngryBook />} />
                            <Route
                                path="/bamboo/realtimediary"
                                element={<BambooRealTimeDiary />}
                            />
                            <Route
                                path="/bamboo/topdiary"
                                element={<BambooTopDiary />}
                            />
                            <Route
                                path="/oauth2/kakao/callback"
                                element={<Kakaocallback />}
                            />
                            <Route
                                path="/oauth2/google/callback"
                                element={<Googlecallback />}
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
    background-color: ${theme.color.black};
    width: 100%;
    height: 100vh;
    display: flex;
`;
const Warp = styled.div`
    width: 100%;
    padding-left: 20%;
    height: calc(100vh - 5rem);
`;
export default App;

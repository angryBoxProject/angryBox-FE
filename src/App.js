import './App.css';
import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import { getCookie, isLogin } from './shared/utils/Cookie';
import { setLogin } from './redux/modules/member';
import Bamboo from './page/Bamboo';
import BambooRealTimeDiary from './components/bamboo/BambooRealTimeDiary';
import BambooTopDiary from './components/bamboo/BambooTopDiary';
import AngryBook from './page/AngryBook';
import Splash from './page/Splash';

import SplashN from './page/new/Splash';
import LoginN from './page/new/Login';
import SignUpN from './page/new/SignUp';
import MainN from './page/new/Main';
import Community from './page/new/Community';
import Best from './page/new/Community/Best';
import Recent from './page/new/Community/Recent';
import Gallery from './page/new/Community/Gallery';
import Statistic from './page/new/Statistic';
import MypageN from './page/new/Mypage';
import PrivateRoute from './components/Route/PrivateRoute';
import PublicRoute from './components/Route/PublicRoute';

// const Main = lazy(() => import('./page/Main'));
// const Login = lazy(() => import('./page/Login'));
// const SignUp = lazy(() => import('./page/SignUp'));
// const Nav = lazy(() => import('./components/Nav'));

function App() {
    const dispatch = useDispatch();
    const mytoken = getCookie('token');
    const isLoginvalue = isLogin();
    useEffect(() => {
        if (mytoken) {
            dispatch(setLogin());
        }
    }, [mytoken, dispatch]);
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* <Route path="/" element={<Splash />} />
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
                    /> */}
                    {/* <PublicRoute
                        restricted={false}
                        component={Main}
                        path="/"
                        exact
                    />
                    <PublicRoute
                        restricted={true}
                        component={Register}
                        path="/register"
                        exact
                    />
                    <PublicRoute
                        restricted={true}
                        component={Login}
                        path="/login"
                        exact
                    />
                    <PrivateRoute component={MyPage} path="/mypage" exact /> */}

                    {/* <Route path="/signup" element={<SignUp />} /> */}
                    <Route
                        path="/oauth2/kakao/callback"
                        // path="/login/oauth2/code/kakao"
                        element={<Kakaocallback />}
                    />
                    <Route
                        path="/oauth2/google/callback"
                        element={<Googlecallback />}
                    />

                    <Route
                        path="/"
                        element={
                            <PublicRoute
                                restricted={false}
                                authenticated={isLoginvalue}
                                component={<SplashN />}
                            />
                        }
                    />
                    <Route
                        path="/new/login"
                        element={
                            <PublicRoute
                                restricted={true}
                                authenticated={isLoginvalue}
                                component={<LoginN />}
                            />
                        }
                    />
                    <Route
                        path="/new/signup"
                        element={
                            <PublicRoute
                                restricted={true}
                                authenticated={isLoginvalue}
                                component={<SignUpN />}
                            />
                        }
                    />
                    <Route
                        path="/new/main"
                        element={
                            <PrivateRoute
                                authenticated={isLoginvalue}
                                component={<MainN />}
                            />
                        }
                    />
                    <Route
                        path="/new/mypage"
                        element={
                            <PrivateRoute
                                authenticated={isLoginvalue}
                                component={<MypageN />}
                            />
                        }
                    />
                    <Route
                        path="/new/community"
                        element={
                            <PrivateRoute
                                authenticated={isLoginvalue}
                                component={<Community />}
                            />
                        }
                    />
                    <Route
                        path="/new/statistic"
                        element={
                            <PrivateRoute
                                authenticated={isLoginvalue}
                                component={<Statistic />}
                            />
                        }
                    />

                    <Route
                        path="/new/community/best"
                        element={
                            <PrivateRoute
                                authenticated={isLoginvalue}
                                component={<Best />}
                            />
                        }
                    />
                    <Route
                        path="/new/community/recent"
                        element={
                            <PrivateRoute
                                authenticated={isLoginvalue}
                                component={<Recent />}
                            />
                        }
                    />
                    <Route
                        path="/new/community/gallery"
                        element={
                            <PrivateRoute
                                authenticated={isLoginvalue}
                                component={<Gallery />}
                            />
                        }
                    />
                    <Route
                        path="/*"
                        element={<Navigate to="/"></Navigate>}
                    ></Route>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;

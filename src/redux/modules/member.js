import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenURL, URL } from '../../Apis/API';
import { getCookie, setCookie } from '../../shared/utils/Cookie';

const ismock = false;
export const login = createAsyncThunk(
    'member/login',
    async ({ data, navigate }, { rejectWithValue }) => {
        try {
            return await URL.post(`/auth/login`, data, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data.data);
                setCookie('token', response.headers.authorization);
                navigate('/new/main', { replace: true });

                return response.data.data;
            });
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message) {
                window.alert(error.response.data.message);
            } else if (error.response.data.error) {
                window.alert(error.response.data.error.split(']')[0] + ']');
            }

            return rejectWithValue(error.response);
        }
    },
);
//kakao
export const kakaoLogin = createAsyncThunk(
    'member/kakaoLogin',
    async ({ code, navigate, dispatch }, { rejectWithValue }) => {
        const _ = null;
        try {
            await URL.post(`oauth2/kakao?code=${code}`, _, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data);
                setCookie('token', response.headers.authorization);
                console.log(getCookie('token'));
                dispatch(setkakaoLogin(response.data.data));
                navigate('/new/main', { replace: true });
                return response.data.data;

                // setCookie('token', response.headers.authorization);

                // sessionStorage.setItem('userInfo', JSON.stringify(res.data));
                // navigate('/main', { replace: true });
            });
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            if (error.response.data.message) {
                window.alert(error.response.data.message);
            } else if (error.response.data.error) {
                window.alert(error.response.data.error.split(']')[0] + ']');
            }

            return rejectWithValue(error.response);
        }
    },
);
//google
export const googleLogin = createAsyncThunk(
    'member/googleLogin',
    async ({ code, navigate }, thunkAPI) => {
        await URL.post(`oauth2/google?code=${code}`)
            .then(res => {
                alert('로그인 완료');
                console.log(res);
                // sessionStorage.setItem('userInfo', JSON.stringify(res.data));
                // navigate('/main');
            })
            .catch(err => {
                console.error(err);
            });
    },
);

export const signup = createAsyncThunk(
    'member/signup',
    async ({ data, navigate }) => {
        console.log(data);
        console.log(data.email);
        try {
            return await URL.post(
                `/users?email=${data.email}&nickname=${data.nickname}&password=${data.password}`,
                data,
            ).then(response => {
                console.log('test');
                navigate('/new/login');
                // window.location.assign('/login');
                // console.log(response);

                return response;
            });
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message) {
                window.alert(error.response.data.message);
            } else if (error.response.data.error) {
                window.alert(error.response.data.error.split(']')[0] + ']');
            }
            console.log(error);
        }
    },
);

export const setLogin = createAsyncThunk('member/setLogin', async () => {
    try {
        return await tokenURL.get(`/profile`).then(res => {
            console.log(res.data.data);
            return res.data.data;
        });
    } catch (error) {
        console.log(error);
        console.log(error.response.data);
        if (error.response.data.message) {
            window.alert(error.response.data.message);
        } else if (error.response.data.error) {
            window.alert(error.response.data.error.split(']')[0] + ']');
        }
    }
});

export const memberSlice = createSlice({
    name: 'member',
    initialState: {
        user_info: {
            id: '',
            email: '',
            nickname: '',
            file: '',
        },
    },
    reducers: {
        setUserName: (state, action) => {
            state.nickname = action.payload;
        },
        setLoginUser: (state, action) => {
            state.user_info = action.payload;
            state.isLogin = true;
            localStorage.setItem('nickname', state.user_info.nickname);
            localStorage.setItem('memberId', state.user_info.memberId);
        },
        setkakaoLogin: (state, action) => {
            console.log(action);
            state.user_info = action.payload;
            state.isLogin = true;
            localStorage.setItem('nickname', state.user_info.nickname);
            localStorage.setItem('memberId', state.user_info.memberId);
        },
        removeLogout: (state, action) => {
            state.user_info = {
                id: '',
                email: '',
                nickname: '',
                file: '',
            };
            state.isLogin = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(action);

                state.user_info = action.payload;
                state.isLogin = true;
                localStorage.setItem('nickname', state.user_info.nickname);
                localStorage.setItem('memberId', state.user_info.memberId);
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user_info = action.payload;
            })
            .addCase(kakaoLogin.fulfilled, (state, action) => {
                console.log(action);
                state.user_info = action.payload;
                state.isLogin = true;
                localStorage.setItem('nickname', state.user_info.nickname);
                localStorage.setItem('memberId', state.user_info.memberId);
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.user_info = action.payload;
                state.isLogin = true;
                localStorage.setItem('nickname', state.user_info.nickname);
                localStorage.setItem('memberId', state.user_info.memberId);
            })
            .addCase(setLogin.fulfilled, (state, action) => {
                state.user_info = action.payload;
                state.isLogin = true;
                localStorage.setItem('nickname', state.user_info.nickname);
                localStorage.setItem('memberId', state.user_info.memberId);
            });
    },
});

export const { setUserName, setLoginUser, setkakaoLogin, removeLogout } =
    memberSlice.actions;

export default memberSlice.reducer;

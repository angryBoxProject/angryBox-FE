import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenURL, URL } from '../../Apis/API';
import { setCookie } from '../../shared/utils/Cookie';

const ismock = false;
export const login = createAsyncThunk(
    'member/login',
    async ({ data, navigate }, { rejectWithValue }) => {
        try {
            return await URL.post(`/auth/login`, data, {
                withCredentials: true,
            }).then(response => {
                console.log(response);
                setCookie('token', response.headers.authorization);
                navigate('/main');

                return response.data.data;
            });
        } catch (error) {
            console.log(error);
            window.alert(error.response.data.message);

            return rejectWithValue(error.response);
        }
    },
);
//kakao
export const kakaoLogin = createAsyncThunk(
    'member/kakaoLogin',
    async ({ code, navigate }, thunkAPI) => {
        await URL.post(`oauth2/kakao?code=${code}`)
            .then(res => {
                console.log(res);
                // sessionStorage.setItem('userInfo', JSON.stringify(res.data));
                navigate('/main');
            })
            .catch(err => {
                console.error(err);
            });
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
    async (data, navigate) => {
        console.log(data);
        try {
            return await URL.post(
                `/users?email=${data.email}&nickname=${data.nickname}&password=${data.password}`,
                data,
            ).then(response => {
                navigate('/login');
                // window.location.assign('/login');
                // console.log(response);

                return response;
            });
        } catch (error) {
            window.alert(error.response.data.message);

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
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user_info = action.payload;
                state.isLogin = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user_info = action.payload;
            })
            .addCase(kakaoLogin.fulfilled, (state, action) => {
                state.user_info = action.payload;
                state.isLogin = true;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.user_info = action.payload;
                state.isLogin = true;
            })
            .addCase(setLogin.fulfilled, (state, action) => {
                state.user_info = action.payload;
                state.isLogin = true;
            });
    },
});

export const { setUserName, setLoginUser } = memberSlice.actions;

export default memberSlice.reducer;

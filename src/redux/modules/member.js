import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../Apis/API';
import { setCookie } from '../../shared/utils/Cookie';

export const login = createAsyncThunk(
    'member/login',
    async (data, { rejectWithValue }) => {
        try {
            return await URL.post(`/auth/login`, data, {
                withCredentials: true,
            }).then(response => {
                console.log(response);
                setCookie('token', response.headers.authorization);

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
    'user/kakaoLogin',
    async ({ code, navigate }, thunkAPI) => {
        await URL.post(`oauth2/kakao?code=${code}`)
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
export const memberSlice = createSlice({
    name: 'member',
    initialState: {
        user_info: {
            id: '',
            email: '',
            nickname: '',
        },
    },
    reducers: {
        setUserName: (state, action) => {
            state.nickname = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user_info = action.payload;
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user_info = action.payload;
            });
    },
});

export const { setUserName } = memberSlice.actions;

export default memberSlice.reducer;

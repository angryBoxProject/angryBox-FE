import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../Apis/API';

export const login = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            return await URL.post(`/auth/login`, data, {
                withCredentials: true,
            }).then(response => {
                console.log(response);
                // setCookie('token', response.headers.authorization, 1);
                // sessionStorage.setItem('token', response.headers.authorization);
                // window.location.assign('/main');

                return response.data.data;
            });
        } catch (error) {
            console.log(error);
            window.alert(error.response.data.message);

            return rejectWithValue(error.response);
        }
    },
);

export const memberSlice = createSlice({
    name: 'member',
    initialState: {
        memberID: '',
        nickname: '',
    },
    reducers: {
        setUserName: (state, action) => {
            state.nickname = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user_info = action.payload;
            state.isLoading = false;
            state.isLoggedin = true;
        });
    },
});

export const { setUserName } = memberSlice.actions;

export default memberSlice.reducer;

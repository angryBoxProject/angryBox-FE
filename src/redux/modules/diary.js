import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenURL, URL } from '../../Apis/API';
import { setCookie } from '../../shared/utils/Cookie';

export const mainPageLoad = createAsyncThunk(
    'diary/all',
    async ({ dispatch }, { rejectWithValue }) => {
        try {
            return await URL.get(`/angrybox`)
            .then(response => {
                console.log(response);
                
                return response.data.data;
            });
        } catch (error) {
            console.log(error);
            window.alert(error.response.data.message);

            return rejectWithValue(error.response);
        }
    },
);

export const diarySlice = createSlice({
    name: 'diary',
    initialState: {
        
    },
    reducers: {
        setDiarys: (state, action) => {
            state.diarys = action.payload;
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

export const { setDiarys } = diarySlice.actions;

export default diarySlice.reducer;

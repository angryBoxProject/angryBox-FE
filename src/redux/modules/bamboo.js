import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenURL } from '../../Apis/API';

export const getDiary = createAsyncThunk(
    'getDiary',
    async (lastDiaryId, { rejectWithValue }) => {
        console.log('lastDiaryId:::', lastDiaryId);
        try {
            return await tokenURL
                .get(`/diaries?lastDiaryId=${lastDiaryId}&size=5`)
                .then(res => {
                    // console.log(res);
                    return res.data.data.diaries;
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const getTopDiary = createAsyncThunk(
    'getTopDiary',
    async (lastTopDiaryId, { rejectWithValue }) => {
        console.log('lastTopDiaryId:::', lastTopDiaryId);
        try {
            return await tokenURL
                .get(`/diaries/todayTop/${lastTopDiaryId}/5`)
                .then(res => {
                    // console.log(res);
                    return res.data.data.todayTopDiary;
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const bambooSlice = createSlice({
    name: 'bamboo',
    initialState: {
        lastDiaryId: -1,
        lastTopDiaryId: 0,
        Diarylist: [],
        TopDiarylist: [],
        hasMorePosts: true,
        listloading: false,
    },
    reducers: {
        setlastDiaryId: (state, action) => {
            state.lastDiaryId = state.notilist[state.notilist.length - 1].id;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getDiary.pending, state => {
                state.listloading = true;
            })
            .addCase(getDiary.fulfilled, (state, action) => {
                state.Diarylist.push(...action.payload);
                // // const data = state.notilist.filter(data => {
                // //     console.log(data.id);
                // // });
                // //중복제거해야함
                // state.lastDiaryId =
                //     state.notilist[state.notilist.length - 1].id;
                // console.log('lastnotiId', state.lastDiaryId);
                // state.hasMorePosts = action.payload.length === 5;
                // state.listloading = false;
                // if (state.lastDiaryId === 1) state.hasMorePosts = false;
            })
            .addCase(getTopDiary.pending, state => {
                state.listloading = true;
            })
            .addCase(getTopDiary.fulfilled, (state, action) => {
                state.TopDiarylist.push(...action.payload);
                // // const data = state.notilist.filter(data => {
                // //     console.log(data.id);
                // // });
                // //중복제거해야함
                // state.lastDiaryId =
                //     state.notilist[state.notilist.length - 1].id;
                // console.log('lastnotiId', state.lastDiaryId);
                // state.hasMorePosts = action.payload.length === 5;
                // state.listloading = false;
                // if (state.lastDiaryId === 1) state.hasMorePosts = false;
            });
    },
});

export const { setlastDiaryId } = bambooSlice.actions;

export default bambooSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { tokenURL } from '../../Apis/API';

export const getMonthDiaryList = createAsyncThunk(
    'getnotis',
    async (data, { rejectWithValue }) => {
        console.log('lastNotiId:::', data);
        try {
            return await tokenURL
                .get(
                    `/diaries/month/${data.date}/${data.lastDiaryId}/${data.size}`,
                )
                .then(res => {
                    return res.data.data.diaryListInMonth;
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const getBankFirstPostList = createAsyncThunk(
    'getBankFirstPostList',
    async (data, { rejectWithValue }) => {
        console.log('getBankPostList', data);
        try {
            return await tokenURL
                .get(`/diaries/coinBank/${data.coinBankId}/0/15`)
                .then(res => {
                    return res.data.data.diaryListInCoinBank;
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const getBankPostList = createAsyncThunk(
    'getBankPostList',
    async (data, { rejectWithValue }) => {
        console.log('getBankPostList', data);
        try {
            return await tokenURL
                .get(
                    `/diaries/coinBank/${data.coinBankId}/${data.lastDiaryId}/15`,
                )
                .then(res => {
                    return res.data.data.diaryListInCoinBank;
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const setMakeBank = createAsyncThunk(
    'setMakeBank',
    async ({ data, navigate }, { rejectWithValue }) => {
        console.log('setMakeBank', data);
        try {
            return await tokenURL.post(`/bank`, data).then(res => {
                navigate('/main');
                location.reload();
                console.log(res);
            });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        lastnotiId: 0,
        banklist: [],
        hasMorePosts: true,
        listloading: false,
        lastDiaryId: 0,
        bankpostlist: [],
        hasMoreBankPosts: true,
        Postlistloading: false,
        calendarDay: moment().format('YYYY-MM-DD'),
    },
    reducers: {
        setlastnotiId: (state, action) => {
            state.lastnotiId = state.notilist[state.notilist.length - 1].id;
        },
        setCalendarDay: (state, action) => {
            state.calendarDay = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getMonthDiaryList.pending, state => {
                state.listloading = true;
            })
            .addCase(getMonthDiaryList.fulfilled, (state, action) => {
                state.banklist = action.payload;
            })
            .addCase(getBankFirstPostList.fulfilled, (state, action) => {
                state.bankpostlist = [];
                state.bankpostlist.push(...action.payload);
            })
            .addCase(getBankPostList.pending, state => {
                state.Postlistloading = true;
            })
            .addCase(getBankPostList.fulfilled, (state, action) => {
                if (!state.Postlistloading) return;
                state.bankpostlist.push(...action.payload);
                state.lastDiaryId =
                    state.bankpostlist[state.bankpostlist.length - 1].id;
                state.hasMoreBankPosts = action.payload.length === 15;
                state.Postlistloading = false;
                if (state.lastDiaryId === 1) state.hasMoreBankPosts = false;
                // state.bankpostlist = action.payload;
            })
            .addCase(setMakeBank.fulfilled, (state, action) => {});
    },
});

export const { setnotilist, setCalendarDay } = mainSlice.actions;

export default mainSlice.reducer;

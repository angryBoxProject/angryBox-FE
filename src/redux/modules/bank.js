import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
                navigate('/new/main', { replace: true });
                location.reload();
                console.log(res);
            });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const setEditBank = createAsyncThunk(
    'setEditBank',
    async ({ data, navigate }, { rejectWithValue }) => {
        console.log('setEditBank', data);
        try {
            return await tokenURL.put(`/bank`, data).then(res => {
                navigate('/new/statistic', { replace: true });
                location.reload();
                console.log(res);
            });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
setEditBank;
export const expiredBank = createAsyncThunk(
    'bank/delete',
    async ({ data, navigate }, { rejectWithValue }) => {
        try {
            return await tokenURL
                .put(`/expired-bank?id=${data.id}`, data)
                .then(res => {
                    console.log(res);
                    // navigate('/main', { replace: true });
                    // location.reload();
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response);
        }
    },
);
export const setMakePost = createAsyncThunk(
    'setMakePost',
    async ({ data, navigate }, { rejectWithValue }) => {
        console.log(data);
        const formdatas = new FormData();

        try {
            for (let i = 0; i < data?.files.length; i++)
                formdatas.append('file', data?.files[i]);
        } catch (error) {
            formdatas.append('file', null);
            console.log('undefined');
        }

        formdatas.append(
            'diary',
            new Blob([JSON.stringify(data)], { type: 'application/json' }),
        );
        formdatas.append('public', data.publiccount);
        try {
            return await tokenURL.post(`/diary`, formdatas).then(res => {
                navigate('/new/main');
                location.reload();
                console.log(res);
            });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const getPost = createAsyncThunk(
    'getPost',
    async ({ data, navigate }, { rejectWithValue }) => {
        console.log('getPost', data);
        try {
            return await tokenURL.get(`/diaries/${data.id}`).then(res => {
                return res.data.data.diary;
            });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const setEditPost = createAsyncThunk(
    'setEditPost',
    async ({ data, navigate }, { rejectWithValue }) => {
        console.log(data);
        const formdatas = new FormData();

        try {
            for (let i = 0; i < data?.files.length; i++)
                formdatas.append('file', data?.files[i]);
        } catch (error) {
            formdatas.append('file', null);
            console.log('undefined');
        }

        formdatas.append(
            'diary',
            new Blob([JSON.stringify(data)], { type: 'application/json' }),
        );
        formdatas.append('public', data.publiccount);
        try {
            return await tokenURL
                .put(`/diaries/${data.id}`, formdatas)
                .then(res => {
                    navigate('/new/main');
                    location.reload();
                    console.log(res);
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const bankSlice = createSlice({
    name: 'bank',
    initialState: {
        lastnotiId: 0,
        banklist: [],
        hasMorePosts: true,
        listloading: false,
        lastDiaryId: 0,
        bankpostlist: [],
        hasMoreBankPosts: true,
        Postlistloading: false,
        showDetail: [],
    },
    reducers: {
        setlastnotiId: (state, action) => {
            state.lastnotiId = state.notilist[state.notilist.length - 1].id;
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
            .addCase(setMakeBank.fulfilled, (state, action) => {})
            .addCase(setEditBank.fulfilled, (state, action) => {})
            .addCase(expiredBank.fulfilled, (state, action) => {})
            .addCase(setMakePost.fulfilled, (state, action) => {})
            .addCase(getPost.fulfilled, (state, action) => {
                state.showDetail = action.payload;
            })
            .addCase(setEditPost.fulfilled, (state, action) => {
                // state.showDetail
            });
    },
});

export const { setnotilist } = bankSlice.actions;

export default bankSlice.reducer;

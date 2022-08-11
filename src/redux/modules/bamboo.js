import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenURL } from '../../Apis/API';

export const getDiary = createAsyncThunk(
    'getDiary',
    async (lastDiaryId, { rejectWithValue }) => {
        console.log('lastDiaryIdlastDiaryId:::', lastDiaryId);
        const data = {
            startDate: '',
            endDate: '',
            imageFilter: 2,
            angry: [],
        };
        try {
            return await tokenURL
                .post(
                    `https://angrybox.link/diaries?lastDiaryId=${lastDiaryId}&size=5`,
                    data,
                )
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
export const getFirstDiary = createAsyncThunk(
    'getFirstDiary',
    async (lastDiaryId, { rejectWithValue }) => {
        console.log('lastDiaryId:::', lastDiaryId);
        const data = {
            startData: '',
            endDate: '',
            imageFilter: 2,
            angry: [],
        };
        try {
            return await tokenURL
                .post(
                    `https://angrybox.link/diaries?lastDiaryId=0&size=5`,
                    data,
                )
                .then(res => {
                    console.log(res);
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
                    console.log(res);
                    return res.data.data.todayTopDiary;
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const getFirstTopDiary = createAsyncThunk(
    'getFirstTopDiary',
    async (lastTopDiaryId, { rejectWithValue }) => {
        console.log('lastTopDiaryId:::', lastTopDiaryId);
        try {
            return await tokenURL.get(`/diaries/todayTop/0/5`).then(res => {
                // console.log(res);
                return res.data.data.todayTopDiary;
            });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const getGallery = createAsyncThunk(
    'getGallery',
    async (data, { rejectWithValue }) => {
        console.log('lastTopDiaryId:::', data.lastDiaryId);
        try {
            return await tokenURL
                .get(`/gallery?lastDiaryId=10&size=10`)
                .then(res => {
                    console.log(res);
                    return res.data.data.list;
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
        lastDiaryId: 0,
        lastTopDiaryId: 0,
        lastGalleryId: 0,
        Diarylist: [],
        TopDiarylist: [],
        Gallerylist: [],
        hasMorelist: true,
        hasMoreToplist: true,
        hasMoreGallerylist: true,
        listloading: false,
        Toplistloading: false,
        Gallerylistloading: false,
    },
    reducers: {
        pushrealDiary: (state, action) => {
            state.Diarylist.unshift(action.payload);
        },
        setlastDiaryId: (state, action) => {
            state.lastDiaryId = state.notilist[state.notilist.length - 1].id;
        },
        removelistTopDiary: state => {
            state.TopDiarylist = [];
            state.lastTopDiaryId = 0;
        },
        removelistDiary: state => {
            state.Diarylist = [];
            state.lastDiaryId = -1;
        },
        allreset: state => {
            state.Diarylist = [];
            state.TopDiarylist = [];
            state.Gallerylist = [];
            state.lastDiaryId = 0;
            state.lastTopDiaryId = 0;
            state.lastGalleryId = 0;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getDiary.pending, state => {
                state.listloading = true;
            })
            .addCase(getDiary.fulfilled, (state, action) => {
                if (!state.listloading) return;
                state.Diarylist.push(...action.payload);
                // // const data = state.notilist.filter(data => {
                // //     console.log(data.id);
                // // });
                // //중복제거해야함
                state.lastDiaryId =
                    state.Diarylist[state.Diarylist.length - 1].id;
                state.hasMorelist = action.payload.length === 5;
                state.listloading = false;
                if (state.lastDiaryId === 1) state.hasMorelist = false;
            })
            .addCase(getFirstDiary.fulfilled, (state, action) => {
                state.Diarylist = [];
                state.Diarylist.push(...action.payload);
            })

            .addCase(getTopDiary.pending, state => {
                state.Toplistloading = true;
            })
            .addCase(getTopDiary.fulfilled, (state, action) => {
                if (!state.Toplistloading) return;
                state.TopDiarylist.push(...action.payload);
                // // const data = state.notilist.filter(data => {
                // //     console.log(data.id);
                // // });
                // //중복제거해야함
                state.lastTopDiaryId =
                    state.TopDiarylist[
                        state.TopDiarylist.length - 1
                    ].todayTopId;
                state.hasMoreToplist = action.payload.length === 5;
                state.Toplistloading = false;
                if (state.lastTopDiaryId === 1) state.hasMoreToplist = false;
            })
            .addCase(getGallery.pending, state => {
                state.Gallerylistloading = true;
            })
            .addCase(getGallery.fulfilled, (state, action) => {
                if (!state.Gallerylistloading) return;
                state.Gallerylist.push(...action.payload);
                // // const data = state.notilist.filter(data => {
                // //     console.log(data.id);
                // // });
                // //중복제거해야함
                state.lastGalleryId =
                    state.Gallerylist[state.Gallerylist.length - 1].id;
                state.hasMoreGallerylist = action.payload.length === 5;
                state.Gallerylistloading = false;
                if (state.lastGalleryId === 1) state.hasMoreGallerylist = false;
            })

            .addCase(getFirstTopDiary.fulfilled, (state, action) => {
                state.TopDiarylist = [];
                state.TopDiarylist.push(...action.payload);
            });
    },
});

export const {
    setlastDiaryId,
    removelistTopDiary,
    removelistDiary,
    pushrealDiary,
    allreset,
} = bambooSlice.actions;

export default bambooSlice.reducer;

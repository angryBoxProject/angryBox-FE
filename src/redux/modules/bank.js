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
                    console.log(res);
                    return res.data.data.diaryListInMonth;
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
            });
    },
});

export const { setnotilist } = bankSlice.actions;

export default bankSlice.reducer;

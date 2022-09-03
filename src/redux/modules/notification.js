import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenURL } from '../../Apis/API';

export const getnotis = createAsyncThunk(
    'getnotis',
    async (lastNotiId, { rejectWithValue }) => {
        // console.log('lastNotiId:::', lastNotiId);
        try {
            return await tokenURL
                .get(`/notification/${lastNotiId}/10`)
                .then(res => {
                    // console.log(res);
                    return res.data.data.ntfList;
                });
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const notificationSlice = createSlice({
    name: 'noti',
    initialState: {
        lastnotiId: 0,
        notilist: [],
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
            .addCase(getnotis.pending, state => {
                state.listloading = true;
            })
            .addCase(getnotis.fulfilled, (state, action) => {
                if (state.hasMorePosts) {
                    state.notilist.push(...action.payload);
                    // const data = state.notilist.filter(data => {
                    //     console.log(data.id);
                    // });
                    //중복제거해야함
                    state.lastnotiId =
                        state.notilist[state.notilist.length - 1].id;
                    console.log('lastnotiId', state.lastnotiId);
                    state.hasMorePosts = action.payload.length === 10;
                    state.listloading = false;
                    if (state.lastnotiId === 1) state.hasMorePosts = false;
                }
            });
    },
});

export const { setnotilist } = notificationSlice.actions;

export default notificationSlice.reducer;

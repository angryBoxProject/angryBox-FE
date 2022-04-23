import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const notificationSlice = createSlice({
    name: 'noti',
    initialState: {
        lastnotiId: 0,
    },
    reducers: {
        setLastnotiId: (state, action) => {
            state.lastnotiId = action.payload;
        },
    },
    extraReducers: builder => {
        builder;
    },
});

export const { setLastnotiId } = notificationSlice.actions;

export default notificationSlice.reducer;

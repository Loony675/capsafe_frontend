import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisibleDA : false,
  isVisibleAddress : false,
};

export const isVisibleSlice = createSlice({
  name: 'isVisible',
  initialState,
  reducers: {
    isVisibleDeparture: (state, action) => {
      state.isVisibleDA = action.payload;
    },
    isVisibleAddressList: (state, action) => {
        state.isVisibleAddress = action.payload;
    }
  },
});

export const { isVisibleDeparture, isVisibleAddressList} = isVisibleSlice.actions;
export default isVisibleSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisibleDA : false
};

export const isVisibleSlice = createSlice({
  name: 'isVisible',
  initialState,
  reducers: {
    isVisibleDeparture: (state, action) => {
      state.isVisibleDA = action.payload;
    },

  },
});

export const { isVisibleDeparture} = isVisibleSlice.actions;
export default isVisibleSlice.reducer;

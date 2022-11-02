import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '172.20.10.7',
};

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    url: (state, action) => {
      state.value = '192.168.151.157'
    },
  },
});

export const { url } = urlSlice.actions;
export default urlSlice.reducer;



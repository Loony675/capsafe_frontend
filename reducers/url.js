import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // value: '192.168.1.22', // local
  // value: 'https://capsafe-backend.vercel.app', // vercel
};

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    url: (state, action) => {
      // state.value = '192.168.10.208'
    },
  },
});

export const { url } = urlSlice.actions;
export default urlSlice.reducer;



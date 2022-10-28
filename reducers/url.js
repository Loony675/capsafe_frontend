import { createSlice } from '@reduxjs/toolkit';

const initialState = {
<<<<<<< HEAD
  value: '192.168.1.21',
=======
  value: '192.168.1.68',
>>>>>>> 2f7a8737a340e44b9482a692c76060c04ad27e95
};

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    url: (state, action) => {
      state.value = '192.168.1.68'
    },
  },
});

export const { url } = urlSlice.actions;
export default urlSlice.reducer;



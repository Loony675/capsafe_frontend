import { createSlice } from '@reduxjs/toolkit';

const initialState = {
<<<<<<< HEAD
  value: '192.168.151.157',
=======
  value: '192.168.10.145',
>>>>>>> 0ab4b80ce67150173653212aa2021885553c855d
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



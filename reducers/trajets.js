import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { depLat: null, depLon: null, arrLat: null, arrLon: null},
};

export const trajetsSlice = createSlice({
  name: 'trajets',
  initialState,
  reducers: {
    addDeparture: (state, action) => {
        console.log( action.payload);
      state.value.depLat = action.payload.depLat;
      state.value.depLon = action.payload.depLon;
    },
    addArrival: (state, action) => {
        console.log( action.payload);
      state.value.arrLat = action.payload.arrLat;
      state.value.arrLon = action.payload.arrLon;
    },
  },
});

export const { addDeparture, addArrival } = trajetsSlice.actions;
export default trajetsSlice.reducer;

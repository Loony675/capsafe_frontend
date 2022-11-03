import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { depLat: null, depLon: null, arrLat: null, arrLon: null, sections: []},
};

export const trajetsSlice = createSlice({
  name: 'trajets',
  initialState,
  reducers: {
    addDeparture: (state, action) => {
        console.log( action.payload);
      state.value.depLat = action.payload.depLat;
      state.value.depLon = action.payload.depLon;
      state.value.depCity = action.payload.depCity;
    },
    addArrival: (state, action) => {
        console.log( action.payload);
      state.value.arrLat = action.payload.arrLat;
      state.value.arrLon = action.payload.arrLon;
      state.value.arrCity = action.payload.arrCity;
    },
    addJourney: (state, action) => {
      console.log( action.payload);
    state.value.sections = action.payload.sections;

  },
  },
});

export const { addDeparture, addArrival, addJourney } = trajetsSlice.actions;
export default trajetsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisibleDA: false,
  isVisibleAddress: false,
  isVisibleListTrajet: false,
};

export const isVisibleSlice = createSlice({
  name: "isVisible",
  initialState,
  reducers: {
    isVisibleDeparture: (state, action) => {
      state.isVisibleDA = action.payload;
    },
    isVisibleAddressList: (state, action) => {
      state.isVisibleAddress = action.payload;
    },
    isVisibleListTraj: (state, action) => {
        state.isVisibleListTrajet = action.payload;
    },
  },
});

export const { isVisibleDeparture, isVisibleAddressList  , isVisibleListTraj} =
  isVisibleSlice.actions;
export default isVisibleSlice.reducer;

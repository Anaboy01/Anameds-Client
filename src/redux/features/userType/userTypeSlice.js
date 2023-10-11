// userTypeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: null, // Initially, no user type is selected
};

const userTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { setUserType } = userTypeSlice.actions;

export const selectUserType = (state) => state.userType.userType;

export default userTypeSlice.reducer;

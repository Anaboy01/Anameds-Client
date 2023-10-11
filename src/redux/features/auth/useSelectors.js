// userSelectors.js

import { createSelector } from '@reduxjs/toolkit';

// Select the user slice from the Redux store
const selectPatient = (state) => state.patient;

// Create a selector to get the user type
export const selectUserType = createSelector(
  [selectPatient],
  (patient) => patient.name // Replace 'type' with the actual field name that stores the user type
);

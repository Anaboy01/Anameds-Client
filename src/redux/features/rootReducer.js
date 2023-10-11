// rootReducer.js

import { combineReducers } from 'redux';
import userTypeReducer from './userType/userTypeSlice';
import patientReducer from './patientapi/patientSlice';
import doctorReducer from './doctors/doctorsSlice';
import hospitalReducer from './hospital/hospitalSlice';

const rootReducer = combineReducers({
  userType: userTypeReducer,
  patient: patientReducer,
  doctor: doctorReducer,
  hospital: hospitalReducer,
  // ...other reducers
});

export default rootReducer;

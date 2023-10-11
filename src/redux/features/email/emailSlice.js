import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      sendingEmail: false,
      emailSent: false,
      msg: ''
}

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
      EMAIL_RESET(state){
            state.sendingEmail= false;
            state.emailSent= false;
            state.msg= '';
      }

  }
});

export const {EMAIL_RESET} = emailSlice.actions

export default emailSlice.reducer
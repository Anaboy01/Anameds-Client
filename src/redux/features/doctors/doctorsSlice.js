import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import doctorService from './doctorService';

const initialState = {
      isLoggedIn: false,
      doctor: null,
      doctors:[],
      twoFactor: false,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: "",
      
}

//REGISTER Patient

export const registerDoctor = createAsyncThunk(
  'doctor/registerDoctor',
  async (doctorData, thunkAPI) => {
        try {
              return await doctorService.registerDoctor(doctorData)
        } catch (error) {
              const message = (error.response && error.response.data && error.response.data) || error.message || error.toString()

              return thunkAPI.rejectWithValue(message)
        }
  }
)


// Login Patient
export const loginDoctor = createAsyncThunk(
      'doctor/loginDoctor',
      async(doctorData, thunkApi) =>{
        try {
          return await doctorService.loginDoctor(doctorData)
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    
          return thunkApi.rejectWithValue(message)
        }
      }
    )
    

    //Logout Patient

export const logoutDoctor = createAsyncThunk(
      'doctor/logoutDoctor',
      async(_, thunkApi) =>{
        try {
          return await doctorService.logoutDoctor()
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    
          return thunkApi.rejectWithValue(message)
        }
      }
    )
    //Logout Patient

export const doctorloginStatus = createAsyncThunk(
      'doctor/loginStatus',
      async(_, thunkApi) =>{
        try {
          return await doctorService.doctorloginStatus()
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    
          return thunkApi.rejectWithValue(message)
        }
      }
    )
    //Get Patient

//GET LOGIN STATUS
export const getDoctor = createAsyncThunk(
      'doctor/getDoctor',
      async(_, thunkApi) =>{
        try {
          return await doctorService.getDoctor()
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    
          return thunkApi.rejectWithValue(message)
        }
      }
    )
export const getDoctorsByHospitalId = createAsyncThunk(
      'doctor/getDoctorsByHospitalId',
      async(_, thunkApi) =>{
        try {
          return await doctorService.getDoctorsByHospitalId()
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    
          return thunkApi.rejectWithValue(message)
        }
      }
    )

    //UPDATE USER
export const updateDoctor = createAsyncThunk(
      'doctor/updateDoctor',
      async(doctorData, thunkApi) =>{
        try {
          return await doctorService.updateDoctor(doctorData)
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    
          return thunkApi.rejectWithValue(message)
        }
      }
    )

const doctorsSlice = createSlice({
      name: 'doctor',
      initialState,
      reducers: {
          RESET(state){
                state.isLoggedIn= false
                state.doctor= null
                state.doctors=[]
                state.twoFactor= false
                state.isError= false
                state.isSuccess= false
                state.isLoading= false
                state.message= ""
          }
      },
      extraReducers: (builder) => {
          builder
          .addCase(registerDoctor.pending, (state, action) => {
            state.isLoading = true
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.doctor = action.payload;
            console.log(action.payload)
            toast.success('Registration Succesful')
      })
      .addCase(registerDoctor.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            state.doctor = null;
            toast.error(action.payload)
      })
    
                //Login User
                .addCase(loginDoctor.pending, (state) => {
                      state.isLoading = true;
                    })
                    .addCase(loginDoctor.fulfilled, (state, action) => {
                      state.isLoading = false;
                      state.isSuccess = true;
                      state.isLoggedIn = true;
                      state.doctor = action.payload;
                      toast.success("Login Successful");
                      console.log(action.payload);
                    })
                    .addCase(loginDoctor.rejected, (state, action) => {
                      state.isLoading = false;
                      state.isError = true;
                      state.message = action.payload;
                      state.doctor = null;
                      toast.error(action.payload);
                      if (action.payload.includes('New browser')) {
                        state.twoFactor = true
                      }
                    })
    
                //Logout User
                .addCase(logoutDoctor.pending, (state) => {
                      state.isLoading = true;
                    })
                    .addCase(logoutDoctor.fulfilled, (state, action) => {
                      state.isLoading = false;
                      state.isSuccess = true;
                      state.isLoggedIn = false;
                      state.doctor = null;
                      toast.success(action.payload);
                      
                    })
                    .addCase(logoutDoctor.rejected, (state, action) => {
                      state.isLoading = false;
                      state.isError = true;
                      state.message = action.payload;
                      
                      toast.error(action.payload);
                      
                    })
    
    
                //LoginStatus User
                .addCase(doctorloginStatus.pending, (state) => {
                      state.isLoading = true;
                    })
                    .addCase(doctorloginStatus.fulfilled, (state, action) => {
                      state.isLoading = false;
                      state.isSuccess = true;
                      state.isLoggedIn = action.payload;
                      
                    })
                    .addCase(doctorloginStatus.rejected, (state, action) => {
                      state.isLoading = false;
                      state.isError = true;
                      state.message = action.payload;
                      
                    })
    
                //getPatient
                 // GET User
          .addCase(getDoctor.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.doctor = action.payload;
              })
              .addCase(getDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                
                state.message = action.payload;
                toast.error(action.payload)
              })

              //GetDocsById
          .addCase(getDoctorsByHospitalId.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getDoctorsByHospitalId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.doctors = action.payload;
              })
              .addCase(getDoctorsByHospitalId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
              })
    
           // UPDATE USER
           .addCase(updateDoctor.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(updateDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.doctor = action.payload;
        
                toast.success('User Updated')
              })
              .addCase(updateDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
              })
    
      }   //     dispu86tu 
      
})

export const {RESET} = doctorsSlice.actions

export const selectIsDoctorLoggedIn = (state) => state.doctor.isLoggedIn
export const selectADoctor = (state) => state.doctor.doctor

export default doctorsSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { ResponseType } from "axios";
import { ToastFunc } from "../utils/ToastFun";
import { userProfileType } from "../types/types";

interface userDataType{
        first_name: string | number;
        last_name: string | number;
        phone_no: string | number;
    }

const initialState: Record<string, string | null | Record<string, string | number | null>> = {
    userProfile: {},
    status: "idel",
    error: null
}

//get user details
export const getUserDetails = createAsyncThunk('users/profile', async (body, thunkApi) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3001/profile`, { headers: { Authorization: `Bearer ${token}` } })
        if (response.status === 200)
            return response.data
    }
    catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message
            }
        }
    }
})

export const updateDetails = createAsyncThunk<ResponseType,userDataType>('users/updateProfile', async (body) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.patch(`http://localhost:3001/profile`, body, { headers: { Authorization: `Bearer ${token}` } })
        if (response.status === 200) {
            ToastFunc(response.data.message, 'success')
            return response.data
        }

    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message
            }
        }
    }
})
const ProfileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.userProfile = action.payload.userProfile
                state.status = 'success';
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error as string
            })
            
            .addCase(updateDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateDetails.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(updateDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error as string
            })
    }
})

export default ProfileSlice.reducer
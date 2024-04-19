import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastFunc } from "../utils/ToastFun";


const initialState: Record<string, string | null | []> = {
    address: [],
    status: "idel",
    error: null,
    checkProfile:''
}


export const getAddress = createAsyncThunk('users/getaddress', async (body, thunkApi) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3001/address`, { headers: { Authorization: `Bearer ${token}` } })        
        return response.data
    }
    catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                ToastFunc(error.response.data.message, 'error')
                return error.response.data
            }else if(error.response.status === 400){
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message
               
            }
        }
    }
})
export const postAddress: any = createAsyncThunk('users/postAddress', async (body, thunkApi) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`http://localhost:3001/address`, body, { headers: { Authorization: `Bearer ${token}` } })
        if (response.status === 200) {
            ToastFunc(response.data.message, "success")
            return response.data
        }
    }
    catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
                ToastFunc(error.response.data, "error")
                throw error.response.data.message
                
            }
        }
    }
})

export const updateAddress: any = createAsyncThunk<[], any>('users/updateAddress', async (body, thunkApi) => {
    try {
        const token = localStorage.getItem('token')
        const { addressId, address } = body
        const response = await axios.patch(`http://localhost:3001/address?addressId=${addressId}`, address, { headers: { Authorization: `Bearer ${token}` } })
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
export const deleteAddress: any = createAsyncThunk('users/deleteAddress', async (body, thunkApi) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://localhost:3001/address?addressId=${body}`, { headers: { Authorization: `Bearer ${token}` } })
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
const AddressSlice = createSlice({
    name: 'Address',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAddress.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.address = action.payload.data
                state.status = 'success';
            })
            .addCase(getAddress.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error as string
            })
    }
})

export default AddressSlice.reducer
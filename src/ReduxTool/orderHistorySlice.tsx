import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastFunc } from "../utils/ToastFun";

const initialState = {
    orderHistoryData: [],
    orderDetailsData: [],
    status: 'idle',
    error: null
}

export const getOrderHistoryData: any = createAsyncThunk('order/getOrderHistoryData', async () => {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            const response = await axios.get(`http://localhost:3001/order-history`, { headers: { Authorization: `Bearer ${token}` } })

            if (response.status === 200) {
                return response.data;
            }
        } else {
            ToastFunc('You are not authorized', 'error')
        }
    } catch (error:any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message;
            }
    }
    }

})
export const postOrderHistoryData: any = createAsyncThunk('order/postOrderHistoryData', async (body) => {
    try {
        const token = localStorage.getItem('token')
        if (token) {    
            const response = await axios.get(`http://localhost:3001/order-history/postOrderHistory?addressId=${body}`,{ headers: { Authorization: `Bearer ${token}` } })
            
            if (response.status === 200) {
                return response.data;
            }
        } else {
            ToastFunc('You are not authorized', 'error')
        }
    } catch (error:any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message;
            }
        }
    }
})

export const getOrderDatails: any = createAsyncThunk('order/getOrderDetailsData', async (body) => {
    const token = localStorage.getItem('token')

    try {
        if (token) {
            const response = await axios.get(`http://localhost:3001/order-history/ordersDetails?orderId=${body}`, { headers: { Authorization: `Bearer ${token}` } })

            if (response.status === 200) {
                return response.data;
            }
        } else {
            ToastFunc('You are not authorized', 'error')
        }
    } catch (error:any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message;
            }
        }
    }
})


const OrderHistory = createSlice({
    name: 'OrderHistory',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getOrderHistoryData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderHistoryData.fulfilled, (state, action) => {
                state.orderHistoryData = action.payload.data
                state.status = 'success';
            })
            .addCase(getOrderHistoryData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
            .addCase(getOrderDatails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderDatails.fulfilled, (state, action) => {
                state.orderDetailsData = action.payload.data
                state.status = 'success';
            })
            .addCase(getOrderDatails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
    }
})

export default OrderHistory.reducer

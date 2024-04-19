import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastFunc } from "../utils/ToastFun";

interface responseType {
    message: string;
    data: []
}

const initialState: Record<string, string | null | Array<Object>> = {
    bestProduct: [],
    status: "idel",
    error: null,
}

export const getBestProduct = createAsyncThunk<responseType, void>('product/getBestProduct', async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3001/best-seller-product`, { headers: { Authorization: `Bearer ${token}` } })
        if (response.status === 200)
            return response.data
    }
    catch (error:any) {
        if (error.response instanceof Error) {
            if (error.response.status === 401 || error.response.status === 400) {
                ToastFunc(error.response.data, 'error')
                throw error.response.data;
            }
        }
    }
})

const BestSellerProductSlice = createSlice({
    name: 'BestSellerProduct',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getBestProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBestProduct.fulfilled, (state, action) => {
                state.bestProduct = action.payload.data
                state.status = 'success'
            })
            .addCase(getBestProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message as string;
            })
    }
})

export default BestSellerProductSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { productType } from "../types/types";
import { ToastFunc } from "../utils/ToastFun";

interface DetailState {
    productDetails: { ProductDetails: productType, allColors: [], allSizes: [] } | null;
    status: string;
    error: null | string;
}

interface produtDetailsType {
    productID: string | null | number,
    productColor: string | null,
    productSize: string | null | undefined
}
const initialState: DetailState = {
    productDetails: null,
    status: 'idle',
    error: null
}


export const fetchProductDetail = createAsyncThunk<{ data: { ProductDetails: productType, allColors: [], allSizes: [] } }, produtDetailsType>('product/productDetails', async (body) => {

    try {
        const { productID, productColor, productSize } = body
        let response
        if (productSize === undefined) {
            response = await axios.get(`http://localhost:3001/products/details?productID=${productID}&productColor=${productColor}`)
        } else {
            response = await axios.get(`http://localhost:3001/products/details?productID=${productID}&productColor=${productColor}&productSize=${productSize}`)
        }
        if (response.status === 200)
            return response.data

    } catch (error:any) {
        if (error.response instanceof Error) {
            if (error.response.status === 401 || error.response.status === 400) {
                ToastFunc(error.response.data, 'error')
                throw error.response.data;
            }
        }
    }
})

const productDetails = createSlice({
    name: 'ProductDetails',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProductDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
                console.log('error fetch details');
            })
    }
})

export default productDetails.reducer
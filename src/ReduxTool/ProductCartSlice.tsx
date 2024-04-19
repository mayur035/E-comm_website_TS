import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastFunc } from "../utils/ToastFun";

export const postItems = createAsyncThunk<ResponseType, number>('carts/postItems', async (body) => {
    try {
        const token = localStorage.getItem('token')
        const productVariant_id = body
        const response = await axios.post(`http://localhost:3001/cart`, { productVariant_id }, { headers: { Authorization: `Bearer ${token}` } })

        if (response.status === 200) {
            ToastFunc(response.data.message, 'success')
            return response.data
        }
    }
    catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message;
            }
        }
    }
})
export const getItems = createAsyncThunk<ResponseType, void>('carts/getItems', async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3001/cart`, { headers: { Authorization: `Bearer ${token}` } })
        if (response.status === 200)
            return response.data.data
    }
    catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                console.log(error.response.data.message);
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message;
            }
        }
    }
})
export const patchItems = createAsyncThunk<ResponseType, Record<string, string | number>>('carts/patchItems', async (body, thunkApi) => {
    try {
        const { id, action } = body;
        const token = localStorage.getItem('token')
        const response = await axios.patch(`http://localhost:3001/cart?cartItemId=${id}&action=${action}`, { body }, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    }
    catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401 || error.response.status === 500) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message;
            }
        }
    }
})
export const deleteItems = createAsyncThunk<ResponseType, number>('carts/deleteItems', async (body, thunkApi) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://localhost:3001/cart?cartItemId=${body}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    }
    catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message;
            }   
        }
    }
})

export const clearCart = createAsyncThunk<ResponseType, void>('carts/clearCarts', async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3001/cart/clearCart`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401 || error.response.status === 400) {
                ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message;
            }
        }
    }
})
const initialState: Record<string, [] | string | null> = {
    cartItems: [],
    status: "idel",
    error: null
};

const ProductCart = createSlice({
    name: 'ProductCart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(postItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postItems.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(postItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error as string
            })
            .addCase(getItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.status = 'success';
            })
            .addCase(getItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error as string
            })

            .addCase(clearCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error as string
            })
    }
})

export default ProductCart.reducer
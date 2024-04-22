import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastFunc } from "../utils/ToastFun";
import axios from "axios";
import { responseType } from "../types/types";
import { error } from "console";
import { RootState } from "./State/Store";

interface initialStateType{
    reviews:[];
    status:string;
    error:null | string
}
const initialState:initialStateType = {
    reviews: [],
    status: "idel",
    error: null
}

export const getReviews = createAsyncThunk<responseType,number>('reviews/getReviews', async (body,thunkApi) => {
    try {
        const response = await axios.get(`http://localhost:3001/reviews?productVariantId=${body}`)

        if (response.status === 200) {
            return response.data
        }
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 409 || error.response.status === 401) {
                // ToastFunc(error.response.data.message, 'error')
                throw error.response.data.message
            }else{
                ToastFunc(error.response.data.message, 'error')

            }
        }
    }
})
export const postReviews = createAsyncThunk<responseType,Record<string,string|number>>('reviews/postReviews', async (body) => {
    try {
        const { productVariantId, stars, comment } = body
        const token = localStorage.getItem('token')
        const response = await axios.post(`http://localhost:3001/reviews?productVariantId=${productVariantId}`, { stars, comment }, { headers: { Authorization: `Bearer ${token}` } })

        if (response.status === 200) {
            ToastFunc(response.data.message,'success')
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
const ReviewSlice = createSlice({
    name: 'Reviews',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.
        addCase(getReviews.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getReviews.fulfilled, (state, action) => {
            state.reviews = action.payload.data
            state.status = 'success';
        })
        .addCase(getReviews.rejected, (state, action) => {
            state.status = 'failed';
            state.reviews = []
            state.error = action.error as string
        })
        
        .addCase(postReviews.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(postReviews.fulfilled, (state) => {
            state.status = 'success';
        })
        .addCase(postReviews.rejected, (state, action) => {
            state.status = 'failed';  
            state.reviews = []
            state.error = action.error as string
        })
    }
})


export default ReviewSlice.reducer
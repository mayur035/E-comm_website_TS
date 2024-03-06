import { createSlice } from "@reduxjs/toolkit";
import ProductListing from "../../Data/Product-listing";
import { RootState } from "../State/Store";

export const initialState=ProductListing
const ProductData= createSlice({
    name:"ProductData",
    initialState,
    reducers:{},
})
export default ProductData.reducer;

export const productDataSelector = (state: RootState) => state.ProductData;
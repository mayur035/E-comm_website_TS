import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetails {
    id: number;
    slug: string;
    name: string;
    productVariants: ProductVariant[];
    brands: Brand;
    categories: Category;
}

interface ProductVariant {
    id: number;
    image_keys: {
        isCoverImg: boolean;
        product_url: string;
    };
    color: string;
    mrp: number;
    discount: number;
    description: string;
    in_stock: boolean;
    currency: string;
    default: boolean;
}

interface Brand {
    id: number;
    slug: string;
    name: string;
    image_logo: {
        alt: string;
        url: string;
    };
    details: string;
}

interface Category {
    id: number;
    slug: string;
    name: string;
    image: {
        alt: string;
        url: string;
    };
}

interface DetailState {
    productDetails: {data:{findProductDetails:ProductDetails[]}} | null;
    status: string;
    error: null | string;
}

interface produtDetails {
    productId: number
}

const initialState: DetailState = {
    productDetails: null,
    status: 'idle',
    error: null
}

export const fetchProductDetail: any = createAsyncThunk<[], produtDetails>('product/productDetails', async (body) => {
    const { productId } = body
    const response = await axios.get(`http://localhost:3001/products/details?productID=${productId}`)
    return response.data
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
                state.productDetails = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.status = 'failed';
                console.log(action.error);

                state.error = action.error.message || null;
                console.log('error fetch details');
            })
    }
})


// export const { } = productDetails.actions
export default productDetails.reducer
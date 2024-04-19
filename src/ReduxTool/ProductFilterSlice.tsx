import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./State/Store";
import { brandsType, categoriesType, priceType, responseType } from "../types/types";
import { ToastFunc } from "../utils/ToastFun";


interface FilterState {
    filterProducts: []
    filterCategory: string | null;
    filterBrands: string[];
    filterSelect: string | null;
    filterPrice: { minMRP: number, maxMRP: number };

    categories: categoriesType[];
    brands: brandsType[];
    price: priceType;
    colors: { [productId: string]: string[] };
    
    totalPages:number
    page: number

    status: string,
    error: string | null;
}
const initialState: FilterState = {
    filterProducts: [],
    filterCategory: null,
    filterBrands: [],
    filterSelect: null,
    filterPrice: { minMRP: 0, maxMRP: 0 },

    categories: [],
    brands: [],
    price: { minMRP: 0, maxMRP: 0 },
    colors: {},
    totalPages:1,
    page: 1,
    // productLimit: 6,

    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}
interface FilterData {
    filterType: string;
    filterValue: string | string[] | { max: number, min: number } | { page: number }
}



export const fetch_categories = createAsyncThunk<responseType, void>('filterValues/fetchCategories', async () => {
    try {
        const response = await axios.get(`http://localhost:3001/categories`)
        if (response.status === 200)
            return response.data
    } catch (error: any) {
        if (error.response instanceof Error) {
            if (error.response.status === 401 || error.response.status === 400) {
                ToastFunc(error.response.data, 'error')
                throw error.response.data;
            }
        }
    }
})

export const fetch_brands= createAsyncThunk<responseType, void>('filterValues/fetchBrands', async () => {
    const response = await axios.get(`http://localhost:3001/brands`)
    return response.data
})

export const fetch_price = createAsyncThunk<responseType, void>('filterValues/fetchPrice', async (body, thunkApi) => {
    const response = await axios.get(`http://localhost:3001/price`)
    return response.data
})
export const fetch_color= createAsyncThunk('filterValues/fetchColor', async (productID: string) => {
    const response = await axios.get(`http://localhost:3001/color?productID=${productID}`)
    return { productID, colors: response.data }
})

const ProductFilter = createSlice({
    name: 'ProductFilter',
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            const { filterType, filterValue } = action.payload;
            switch (filterType) {
                case "category":
                    state.filterCategory = filterValue;
                    break;
                case "brands":
                    if (filterValue.nameSlug !== 'All' && filterValue.checked === true) {
                        // Add filterValue.nameSlug to the array
                        state.filterBrands.push(filterValue.nameSlug);
                    } else if (filterValue.nameSlug !== 'All' && filterValue.checked === false) {
                        // Remove filterValue.nameSlug from the array if it exists
                        const index = state.filterBrands.indexOf(filterValue.nameSlug);
                        if (index !== -1) {
                            state.filterBrands.splice(index, 1);
                        }
                    } else {
                        // Reset the array if 'All' is selected
                        state.filterBrands.splice(0, state.filterBrands.length);
                    }
                    break;
                case "price":
                    // Assuming filterValue is an object { min, max }
                    state.filterPrice = filterValue;
                    break;
                case "select":
                    state.filterSelect = filterValue.selectValue;
                    break;
                case "pagination":
                    state.page = filterValue.page;
                    break;
                default:
                    break;
            }
        },
        updateColors: (state, action) => {
            const { productID, colors } = action.payload;
            state.colors[productID] = colors;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetch_filter_product.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetch_filter_product.fulfilled, (state, action) => {
                state.filterProducts = action.payload.data.products;
                state.totalPages = action.payload.data.pages;
                state.status = 'succeeded';
            })
            .addCase(fetch_filter_product.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
            .addCase(fetch_categories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetch_categories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload.data;
            })
            .addCase(fetch_categories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
                console.log('error fetch categories');
            })
            .addCase(fetch_brands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetch_brands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = action.payload.data;
            })
            .addCase(fetch_brands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
            .addCase(fetch_price.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetch_price.fulfilled, (state, action) => {
                state.status = 'succeeded';            
                state.price = action.payload.data as priceType|any;
            })
            .addCase(fetch_price.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
            .addCase(fetch_color.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetch_color.fulfilled, (state, action) => {
                const { productID, colors } = action.payload;
                state.colors[productID] = colors;
            })
            .addCase(fetch_color.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
                console.log('error fetch color');
            })

    }
})
export const { updateFilter } = ProductFilter.actions
export default ProductFilter.reducer

export const fetch_filter_product: any = createAsyncThunk<[], FilterData>('filterData/fetchProducts', async (body, thunkApi) => {
    thunkApi.dispatch(updateFilter({ filterType: body.filterType, filterValue: body.filterValue }))
    //get state
    const state = thunkApi.getState() as RootState;
    const category = state.ProductFilter.filterCategory;
    const brands = state.ProductFilter.filterBrands;
    const price = state.ProductFilter.filterPrice;
    const page = state.ProductFilter.page;
    const select = state.ProductFilter.filterSelect;

    // const encodedFilterPriceValue = encodeURIComponent(JSON.stringify(price));
    const stringBrandArray = brands.toString();
    
    
    const response = await axios.get(`http://localhost:3001/products?sortBy=${select}&maxPrice=${price.maxMRP}&minPrice=${price.minMRP}&brands=${stringBrandArray}&category=${category}&page=${page}&productlimit=2`)     
    return response.data
})



    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import axios from "axios";
    import { RootState } from "../State/Store";

    interface Categories {
        id: number;
        name: string;
        image: {
            alt: string;
            url: string
        };
    }

    interface Brands {
        id: number;
        name: string;
        img_logo: {
            alt: string;
            url: string
        };
        details: string
    }

    interface Price {
        minMRP: number,
        maxMRP: number
    }
    interface FilterState {
        filterProducts: { data: [] }
        filterCategory: string | null;
        filterBrands: string[];
        filterSelect: string | null;
        filterPrice: { minMRP: number, maxMRP: number };

        categories: { data: Categories[] };
        brands: { data: Brands[] };
        price: { data: Price };
        colors: { [productId: string]: string[] };

        page: number

        status: string,
        error: string | null;
    }
    const initialState: FilterState = {
        filterProducts: { data: [] },
        filterCategory: null,
        filterBrands: [],
        filterSelect: null,
        filterPrice: { minMRP: 0, maxMRP: 0 },

        categories: { data: [] },
        brands: { data: [] },
        price: { data: { minMRP: 0, maxMRP: 0 } },
        colors: {},

        page: 1,
        // productLimit: 6,

        status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    }
    interface FilterData {
        filterType: string;
        filterValue: string | string[] | { max: number, min: number } | { page: number }
    }



    const GET_CATEGORIES_URL = `http://localhost:3001/categories`;
    const GET_BRANDS_URL = `http://localhost:3001/brands`;
    const GET_PRICE_URL = `http://localhost:3001/price`;
    // const GET_COLOR_URL = `http://localhost:3001/color`;

    export const fetch_categories: any = createAsyncThunk('filterValues/fetchCategories', async () => {
        const response = await axios.get(GET_CATEGORIES_URL)
        return response.data
    })

    export const fetch_brands: any = createAsyncThunk('filterValues/fetchBrands', async () => {
        const response = await axios.get(GET_BRANDS_URL)
        return response.data
    })

    export const fetch_price: any = createAsyncThunk('filterValues/fetchPrice', async (body, thunkApi) => {
        const response = await axios.get(GET_PRICE_URL)
        return response.data
    })
    export const fetch_color: any = createAsyncThunk('filterValues/fetchColor', async (productID: string) => {
       
        const response = await axios.get(`http://localhost:3001/color?productID=${productID}`)
        return  {productID, colors: response.data}
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
                    state.filterProducts = action.payload;
                    state.status = 'succeeded';
                    console.log('success fetch products');
                })
                .addCase(fetch_filter_product.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || null;
                    console.log('error fetch products');
                })
                .addCase(fetch_categories.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetch_categories.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.categories = action.payload;
                })
                .addCase(fetch_categories.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || null;
                    console.log('error fetch categories');
                })
                .addCase(fetch_brands.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetch_brands.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.brands = action.payload;
                })
                .addCase(fetch_brands.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || null;
                    console.log('error fetch brands');
                })
                .addCase(fetch_price.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetch_price.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.price = action.payload;
                })
                .addCase(fetch_price.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || null;
                    console.log('error fetch price');
                })
                .addCase(fetch_color.fulfilled, (state, action) => {
                    const { productID, colors } = action.payload;
                    state.colors[productID] = colors;
                })
                .addCase(fetch_color.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || null;
                    console.log('error fetch color');
                })

        }
    })
    // export const allProducts = (state: RootState) => state.ProductData.products.data;
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

        const encodedFilterPriceValue = encodeURIComponent(JSON.stringify(price));
        const stringBrandArray = brands.toString();

        const response = await axios.get(`http://localhost:3001/products?sortBy=${select}&price=${encodedFilterPriceValue}&brands=${stringBrandArray}&category=${category}&page=${page}&productlimit=2`)

        return response.data
    })



import { createSlice } from "@reduxjs/toolkit";
import ProductListing from "../../Data/Product-listing";

interface FilterState {
    filterProducts: any[];
    filterCategory: string | null;
    filterPrice: { min: number, max: number };
    filterBrands: string[];
    filterSelect: string | null;
}
const initialState: FilterState = {
    filterProducts: ProductListing,
    filterCategory: null,
    filterPrice: { min: 0, max:0},
    filterBrands: [],
    filterSelect: 'high-low',
}

const ProductFilter = createSlice({
    name: 'ProductFilter',
    initialState,
    reducers: {
        filterCategory: (state, action) => {
            try {
                state.filterCategory = action.payload
            }
            catch (e) {
                console.log(e);
            }
        },
        filterBrand: (state, action) => {
            try {
                const brand = action.payload;
                if (!state.filterBrands.includes(brand)) {
                    state.filterBrands.push(action.payload)
                }
                else if (state.filterBrands.includes(brand)) {
                    const index = state.filterBrands.indexOf(brand);
                    state.filterBrands.splice(index, 1);
                }
            }
            catch (e) {
                console.log(e);
            }
        },
        filterPrice: (state, action) => {
            try {
                state.filterPrice = action.payload
            }
            catch (e) {
                console.log(e);
            }
        },
        filterSelect: (state, action) => {
            try {
                state.filterSelect = action.payload        
            }
            catch (e) {
                console.log(e);
            }
        },
        filterAll: (state) => {
            try {
                let FilterData = ProductListing;

                if (state.filterCategory !== null) {
                    if (state.filterCategory !== "All") {
                        FilterData = FilterData.filter((product) => product.productCategory === state.filterCategory);
                    }
                }

                if (state.filterBrands.length > 0) {
                    if (!state.filterBrands.includes("All")) {
                        FilterData = FilterData.filter((product) => state.filterBrands.includes(product.productBrand));
                    }
                }
                if (state.filterPrice.min !== 0 || state.filterPrice.max !== 1000) {
                    FilterData = FilterData.filter((product) => product.productOriginalPrice >= state.filterPrice.min && product.productOriginalPrice <= state.filterPrice.max);
                }
                if (state.filterSelect === "high-low") {
                    const desendingSort = FilterData.sort((a, b) => b.productOriginalPrice - a.productOriginalPrice)
                    FilterData = desendingSort
                }
                if (state.filterSelect === "low-high") {
                    const assendingSort = FilterData.sort((a, b) => a.productOriginalPrice - b.productOriginalPrice)
                    FilterData = assendingSort
                }

                state.filterProducts = FilterData;
            }
            catch (e) {
                console.log(e);
            }
        },
    }
})
export const { filterCategory, filterBrand, filterPrice, filterAll, filterSelect } = ProductFilter.actions
export default ProductFilter.reducer

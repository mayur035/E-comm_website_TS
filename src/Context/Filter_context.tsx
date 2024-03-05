import React, { createContext, useContext, useEffect, useReducer } from 'react';

// data
import ProductListing from '../Data/Product-listing';

type ProviderProps = {
    children: React.ReactNode;
};

interface Product {
    id: string;
    Image: {
        src: string;
        alt: string;
    };
    productName: string;
    productCategory: string;
    productOriginalPrice: number;
    productDiscountPrice: number;
    productBrand: string;
}

interface FilterContextType {
    filter_products: Product[];
    all_products: Product[];
    sorting?: () => void;
    sorting_value?: string;
    updateFilterValue?: (event: (React.ChangeEvent<HTMLSpanElement> | React.MouseEvent<HTMLElement>)) => void;
    filters: {
        productCategory: string;
        productBrand: string;
        productOriginalPrice:number;
    }
}

const initialState: FilterContextType = {
    filter_products: [],
    all_products: [],
    sorting_value: 'high-low',
    filters: {
        productCategory: 'all',
        productBrand: 'all',
        productOriginalPrice:0
    }
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

//sorting
const ReducerFunction = (state: FilterContextType, action: any) => {
    switch (action.type) {
        case 'LOAD_FILTER_PRODUCT':
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
            };
        case 'GET_SORT_VALUE':
            let userSortValue = document.getElementById('sortBy') as HTMLSelectElement;
            let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
            console.log("GET_SORT_VALUE");

            return {
                ...state,
                sorting_value: sort_value
            };
        case 'SORTING_PRODUCTS':
            let newSortData;
            const { filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];


            if (state.sorting_value === 'low-high') {
                newSortData = tempSortProduct.sort((a: any, b: any): any => {
                    return a.productOriginalPrice - b.productOriginalPrice;
                });
            } else if (state.sorting_value === 'high-low') {
                newSortData = tempSortProduct.sort((a: any, b: any): any => {
                    return b.productOriginalPrice - a.productOriginalPrice;
                });
            } else if (state.sorting_value === 'newest') {
                // You can add sorting logic for the newest arrivals here
            } else if (state.sorting_value === 'onReview') {
                // You can add sorting logic based on review here
            }
            return {
                ...state,
                filter_products: newSortData || state.filter_products,
            };
        case 'UPDATE_FILTERS_VALUE':
            const { name, value } = action.payload

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value
                }
            }
        case 'FILTER_PRODUCTS':
            let { all_products } = state;
            let tempFilterProduct = [...all_products];
            const { productCategory,productBrand,productOriginalPrice } = state.filters;
        
            if (productCategory !== "all") {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) =>curElem.productCategory === productCategory 
                );
            }
            if (productOriginalPrice !== 0) {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) =>curElem.productOriginalPrice === productOriginalPrice
                );
            }
            if (productBrand !== "all") {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) =>curElem.productBrand.toLowerCase() === productBrand.toLowerCase()
                );
            }
            return {
                ...state,
                filter_products: tempFilterProduct
            }
        default:

            return state;
    }
};

export const FilterContextProvider: React.FC<ProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(ReducerFunction, initialState);

    const sorting = () => {
        dispatch({ type: 'GET_SORT_VALUE' });
    };

    const updateFilterValue = (event: (React.ChangeEvent<HTMLSpanElement> | (React.MouseEvent<HTMLElement>))): void => {
        const target = event.target as HTMLSpanElement;
        const name = target.getAttribute('data-name');
        const value = target.getAttribute('data-value');
        
        dispatch({ type: 'UPDATE_FILTERS_VALUE', payload: { name, value } })
    }


    //to sort the product
    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" });
        dispatch({ type: "SORTING_PRODUCTS" });
    }, [ProductListing, state.sorting_value, state.filters]);


    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCT", payload: ProductListing });
    }, [ProductListing]);

    return (
        <FilterContext.Provider value={{ ...state, sorting, updateFilterValue }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext) as FilterContextType;
};

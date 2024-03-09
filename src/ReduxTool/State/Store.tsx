import {configureStore} from '@reduxjs/toolkit';
import ProductData from '../Data/ProductDataSlice';
import ProductFilter from '../Filters/FilterSlice'
import ProductCart from '../Cart/ProductCartSlice';
import AuthDataSlice from '../Auth/AuthDataSlice';

export const Store = configureStore({
    reducer:{
        ProductData:ProductData,
        ProductFilter:ProductFilter,
        ProductCart:ProductCart,
        AuthUserData:AuthDataSlice
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch;    
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ProductData from '../Data/ProductDataSlice';
import ProductFilter from '../Filters/FilterSlice'
import ProductCart from '../Cart/ProductCartSlice';
import AuthDataSlice from '../Auth/AuthDataSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "perssist-root",
    version: 1,
    storage
}

const CombineReducers = combineReducers(
    {
        ProductData: ProductData,
        ProductFilter: ProductFilter,
        ProductCart: ProductCart,
        AuthUserData: AuthDataSlice
    }
)
const PersistReducer = persistReducer(persistConfig,CombineReducers)

export const Store = configureStore({
    reducer: PersistReducer,
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch;    
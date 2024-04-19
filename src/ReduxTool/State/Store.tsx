import { combineReducers, configureStore} from '@reduxjs/toolkit';
import ProductFilter from '../ProductFilterSlice'
import ProductCart from '../ProductCartSlice';
import AuthDataSlice from '../AuthDataSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productDetailsSlice from '../productDetailsSlice';
import profileSlice from '../profileSlice';
import AddressSlice from '../addressSlice';
import OrderHistory from '../orderHistorySlice';
import UISlice from '../uiSlice';
import BestSellerSlice from '../BestSellerSlice';




const persistConfig = {
    key: "perssistRoot",
    version: 1,
    storage
}

const CombineReducers = combineReducers(
    {
        ProductFilter: ProductFilter,
        ProductCart: ProductCart,
        AuthUserData: AuthDataSlice,
        productDetailsSlice:productDetailsSlice,
        ProfileSlice:profileSlice,
        AddressSlice:AddressSlice,
        OrderHistory:OrderHistory,
        UISlice:UISlice,
        BestSellerSlice:BestSellerSlice
    }
)
const PersistReducer = persistReducer(persistConfig,CombineReducers)

export const Store = configureStore({
    reducer: PersistReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
                  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
    })
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch;    
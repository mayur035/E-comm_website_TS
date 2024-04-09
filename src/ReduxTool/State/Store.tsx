import { combineReducers, configureStore} from '@reduxjs/toolkit';
import ProductFilter from '../Filters/FilterSlice'
import ProductCart from '../Cart/ProductCartSlice';
import AuthDataSlice from '../Auth/AuthDataSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: "perssistRoot",
    version: 1,
    storage
}

const CombineReducers = combineReducers(
    {
        ProductFilter: ProductFilter,
        ProductCart: ProductCart,
        AuthUserData: AuthDataSlice
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
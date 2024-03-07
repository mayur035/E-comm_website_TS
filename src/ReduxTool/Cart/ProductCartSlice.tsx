import { createSlice } from "@reduxjs/toolkit";
import ProductListing from "../../Data/Product-listing";
interface CartState {
    cartItems: typeof ProductListing;
}

const initialState: CartState = { cartItems: [] };
const ProductCart = createSlice({
    name: 'ProductCart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            try {
                const findProductByID = ProductListing.find((items) => items.id === action.payload)
                const isProductInCart = state.cartItems.some((item) => item.id === findProductByID?.id);
                if (isProductInCart) {
                    console.log("Product already in cart");
                    return;
                }
                if (findProductByID) {
                    state.cartItems.push(findProductByID);
                }
            }
            catch (e) {
                console.log(e);
            }
        },
        removeToCart: (state, action) => { 
            try{
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            }
            catch (e) {
                console.log(e);
            }
        },
    }
})

export const { addToCart, removeToCart } = ProductCart.actions
export default ProductCart.reducer
import { createSlice } from "@reduxjs/toolkit";
import ProductListing from "../../Data/Product-listing";
interface CartState {
    cartItems: {
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
        productQuantity: number;
    }[],
    isOrderConfirmed: boolean;
}

const initialState: CartState = { cartItems: [], isOrderConfirmed: false };

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
                    state.cartItems.push({ ...findProductByID, productQuantity: 1 });
                }
            }
            catch (e) {
                console.log(e);
            }
        },
        removeToCart: (state, action) => {
            try {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            }
            catch (e) {
                console.log(e);
            }
        },
        increaseQuantity: (state, action) => {
            try {
                const findProductByID = state.cartItems.find((items) => items.id === action.payload)
                if (findProductByID) {
                    if (findProductByID.productQuantity < 5)
                        findProductByID.productQuantity++;
                }
            }
            catch (e) {
                console.log(e);
            }
        },
        descreaseQuantity: (state, action) => {
            try {
                const findProductByID = state.cartItems.find((items) => items.id === action.payload)
                if (findProductByID) {
                    if (findProductByID.productQuantity > 1)
                        findProductByID.productQuantity--;
                }
            }
            catch (e) {
                console.log(e);
            }
        },
        emptyCart: (state, action) => {
            try {
                state.isOrderConfirmed = action.payload;
                console.warn(action.payload);
                state.cartItems = [];

            }
            catch (e) {
                console.log(e);
            }
        }
    }
})

export const { addToCart, removeToCart, increaseQuantity, descreaseQuantity, emptyCart } = ProductCart.actions
export default ProductCart.reducer
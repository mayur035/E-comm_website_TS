import React, { useState } from 'react'
import classes from './Cart-total.module.css'
import Button from '../../../UI/Button/PrimaryButton'
import { RootState } from '../../../../ReduxTool/State/Store'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart } from '../../../../ReduxTool/Cart/ProductCartSlice'

const CartTotal = () => {
    const CartTotalSelector = useSelector((state: RootState) => state.ProductCart.cartItems)
    const dispatch = useDispatch()

    // Calculate subtotal
    const subtotal = CartTotalSelector.reduce((total, item) => total + item.productOriginalPrice * item.productQuantity, 0);

    return (
        <React.Fragment>
            <p className={classes['cart-total-heading']}>Cart total</p>
            <div className={classes['cart-subtotal']}>
                <p>Subtotal : </p>
                <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className={classes['cart-shipping']}>
                <p>Shipping : </p>
                <p>Free </p>
            </div>
            <hr />
            <div className={classes['cart-total']}>
                <p>Total : </p>
                <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className={classes['checkout-btn']}>
                <Button
                    onClick={()=>dispatch(emptyCart(true))}>Checkout</Button></div>
        </React.Fragment>
    )
}

export default CartTotal
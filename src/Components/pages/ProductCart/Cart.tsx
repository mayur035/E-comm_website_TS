import classes from './Cart.module.css'
import ProductPath from '../../UI/ProductPath/Product-Path'
import CartTotal from './CartTotal/Cart-total'
import CartItem from './CartItems/CartItem'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../ReduxTool/State/Store'
import { CartItemtype } from '../../../types/types'

const Cart = () => {
    const cartSelector = useSelector((state: RootState) => state.ProductCart.cartItems as []);
    return (
        <div className={classes['cart-main']}>
            <ProductPath />
            <div className={classes['cart-container']}>
                <div className={classes['cart-item-list']}>
                    <div className={classes['cart-item-header']}>
                        <p className={classes['cart-product']}>Product</p>
                        <div className={classes['cart-quantity-total']}>
                            <p className={classes['cart-quanity-heading']}>Quanity</p>
                            <p className={classes['cart-subtotal-heading']}>Sub Total</p>
                        </div>
                    </div>
                    <hr />
                    <div className={classes.cartItems}>
                        {cartSelector && cartSelector.map((item:CartItemtype, index:any) => (
                            <React.Fragment key={index}>
                                <CartItem items={item} />
                                <hr />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className={classes['cart-total-content']}>
                    <CartTotal />
                </div>
            </div>
        </div>
    )
}

export default Cart
import React from 'react'
import classes from './Cart-total.module.css'
import Button from '../../../UI/Button/PrimaryButton'

const CartTotal = () => {
    return (
        <React.Fragment>
            <p className={classes['cart-total-heading']}>Cart total</p>
            <div className={classes['cart-subtotal']}>
                <p>Subtotal : </p>
                <p>$300</p>
            </div>
            <hr />
            <div className={classes['cart-shipping']}>
                <p>Shipping : </p>
                <p>Free</p>
            </div>
            <hr />
            <div className={classes['cart-total']}>
                <p>Total : </p>
                <p>$300</p>
            </div>
            <div className={classes['checkout-btn']}> <Button>Checkout</Button></div>
        </React.Fragment>
    )
}

export default CartTotal
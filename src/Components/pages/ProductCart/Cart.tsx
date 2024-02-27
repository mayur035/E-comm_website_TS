import classes from './Cart.module.css'
import ProductPath from '../../UI/ProductPath/Product-Path'
import CartTotal from './CartTotal/Cart-total'
import CartItem from './CartItems/CartItem'
import { useEffect, useState } from 'react'

const Cart = () => {
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    // const updateWindowWidth = () => {
    //     setWindowWidth(window.innerWidth);
    // };

    // useEffect(() => {
    //     window.addEventListener('resize', updateWindowWidth);

    //     // Cleanup function to remove event listener
    //     return () => {
    //         window.removeEventListener('resize', updateWindowWidth);
    //     };
    // }, []);

    return (
        <div className={classes['cart-main']}>
            <ProductPath />
            <div className={classes['cart-container']}>
                <div className={classes['cart-item-list']}>
                    <div className={classes['cart-item-header']}>
                        <p className={classes['cart-product']}>Product</p>
                        <div className={classes['cart-quantity-total']}>
                            <p className={classes['cart-subtotal-heading']}>Sub Total</p>
                            <p className={classes['cart-quanity-heading']}>Quanity</p>
                        </div>
                    </div>
                    <hr />
                    <div className={classes.cartItems}>

                        <CartItem />
                        <hr />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
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
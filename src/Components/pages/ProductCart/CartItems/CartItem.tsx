import React, { useEffect, useState } from 'react'
import classes from './CartItem.module.css'
import { Cancel } from '@mui/icons-material'

const CartItem = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

  return (
    <div className={classes['cart-item-card-main']}>
        <div className={classes['cart-item-detail']}>
            <div style={{position:'relative'}}>
                <Cancel htmlColor='red' style={{position:'absolute',top:'-4',left:'-4'}}/>
                <img height='120px' width='157px' src="" alt="" />
                </div>
            <div className={classes['cart-item-desc']}>
                <p className={classes['cart-product-name']}>Macbook Pro 15</p>
                <p className={classes['cart-product-color']}>Color : </p>
                <p className={classes['cart-product-price']}>Price : $100</p>
            </div>
        </div>
        <div className={classes['cart-item-content']}>
            <div className={classes['cart-item-subtotal']}>{windowWidth<=320 && <b>Subtotal :</b>}$200</div>
            <div className={classes['cart-item-quantity']}>
            {windowWidth<=320 && <b>Quantity :</b>}
                <input type="number" min='1'  style={{height:'35px',width:'72px'}}/>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default CartItem
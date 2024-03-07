import { useEffect, useState } from 'react'
import classes from './CartItem.module.css'
import { Cancel } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { addToCart, descreaseQuantity, increaseQuantity, removeToCart } from '../../../../ReduxTool/Cart/ProductCartSlice'
import { RootState } from '../../../../ReduxTool/State/Store'

interface ProductItemsProps {
    items: {
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
    };
}
const CartItem = (props: ProductItemsProps) => {
    const { items } = props
    const dispatch = useDispatch();
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
                <div style={{ position: 'relative' }}>
                    <IconButton style={{ position: 'absolute' }} onClick={() => dispatch(removeToCart(items.id))}><Cancel htmlColor='red' /></IconButton>
                    <img height='120px' width='157px' src={items.Image.src} alt={items.Image.alt} />
                </div>
                <div className={classes['cart-item-desc']}>
                    <p className={classes['cart-product-name']}>{items.productName}</p>
                    <p className={classes['cart-product-color']}>{items.productCategory}</p>
                    <p className={classes['cart-product-price']}>Price : <del>{items.productOriginalPrice}</del> {items.productDiscountPrice}</p>
                </div>
            </div>
            <div className={classes['cart-item-content']}>
                <div className={classes['cart-item-quantity']}>
                    {windowWidth <= 650 && <b>Quantity :</b>}
                    {/* <input type="number" min='1' style={{ height: '35px', width: '72px' }} /> */}
                    <div className={classes['cart-quantity-manage']}>
                        <button onClick={() => dispatch(descreaseQuantity(items.id))} style={{ fontSize: '20px', padding: '0px 5px', background: 'transparent' }}>-</button>
                        <span>{items.productQuantity}</span>
                        
                        <button onClick={() => dispatch(increaseQuantity(items.id))} style={{ fontSize: '20px', padding: '0px 5px', background: 'transparent' }}>+</button>
                    </div>
                </div>
                <div className={classes['cart-item-subtotal']}>{windowWidth <= 650 && <b>Subtotal :</b>}${(items.productQuantity * items.productDiscountPrice).toFixed(2)}</div>
            </div>
        </div>
    )
}

export default CartItem
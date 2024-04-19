import { useEffect, useState } from 'react'
import classes from './CartItem.module.css'
import { Cancel } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import { Colordot } from '../../../UI/colorSize/color_Size'
import { deleteItems, getItems, patchItems } from '../../../../ReduxTool/ProductCartSlice'
import { AppDispatch } from '../../../../ReduxTool/State/Store'
import { CartItemtype } from '../../../../types/types'



const CartItem = (props:Record<string,CartItemtype>) => {
    const { items } = props 
    const dispatch = useDispatch<AppDispatch>();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const discountPrice :number =Number( (items.productVariants.mrp - (items.productVariants.discount / 100) * items.productVariants.mrp).toFixed(0))
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
                    <IconButton style={{ position: 'absolute' }} onClick={
                        async () => {
                            await dispatch(deleteItems(items.id))
                            dispatch(getItems())
                        }
                    }
                    ><Cancel htmlColor='red' /></IconButton>
                    <img height='120px' width='157px' src={items.productVariants.image_keys.product_url} alt='cartImage' />
                </div>
                <div className={classes['cart-item-desc']}>
                    <p className={classes['cart-product-name']}>{items?.productVariants?.products?.name}</p>
                    <div className={classes['cart-product-color']}><b>Color :</b><Colordot color={items.productVariants.color} /></div>
                    <p className={classes['cart-product-size']}><b>Size : </b>{items.productVariants.size}</p>
                    <p className={classes['cart-product-price']}><b>Price :</b> <del>{items.productVariants.mrp}</del> ${discountPrice}{items.productVariants.discount !== 0 && <span>({items.productVariants.discount}% Off)</span>}</p>
                </div>
            </div>
            <div className={classes['cart-item-content']}>
                <div className={classes['cart-item-quantity']}>
                    {windowWidth <= 650 && <b>Quantity :</b>}
                    <div className={classes['cart-quantity-manage']}>
                        <button onClick={async () => {
                            await dispatch(patchItems({ id: items?.id, action: 'decrement' }))
                            dispatch(getItems())
                        }} style={{ fontSize: '20px', padding: '0px 5px', background: 'transparent' }}>-</button>
                        <span>{items.quantity}</span>
                        <button onClick={async () => {
                            await dispatch(patchItems({ id: items?.id, action: 'increment' }))
                            dispatch(getItems())
                        }} style={{ fontSize: '20px', padding: '0px 5px', background: 'transparent' }}>+</button>
                    </div>
                </div>
                <div className={classes['cart-item-subtotal']}>{windowWidth <= 650 && <b>Subtotal :</b>}${(items.quantity * discountPrice).toFixed(2)}</div>
            </div>
        </div>
    )
}

export default CartItem
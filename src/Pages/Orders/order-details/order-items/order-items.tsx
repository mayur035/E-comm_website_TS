import { useEffect, useState } from 'react'
import classes from './order-items.module.css'
import { useDispatch } from 'react-redux'
import { Colordot } from '../../../../Components/UI/colorSize/color_Size'



const OrderItems = (props: any) => {
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
        <div className={classes['order-item-card-main']}>
            <div className={classes['order-item-detail']}>
                <div style={{ position: 'relative' }}>
                    <img height='120px' width='157px' src={items.productVariant.image_keys.product_url} alt='orderImage' />
                </div>
                <div className={classes['order-item-desc']}>
                    <p className={classes['order-product-name']}>{items.productVariant.products.name}</p>
                    <div className={classes['order-product-color']}><b>Color :</b><Colordot color={items.productVariant.color} /></div>
                    <p className={classes['order-product-size']}><b>Size : </b>{items.productVariant.size}</p>
                    <p className={classes['order-product-price']}><b>Price :</b> {items.subtotal}</p>
                </div>
            </div>
            <div className={classes['order-item-content']}>
                <div className={classes['order-item-quantity']}>
                    {windowWidth <= 650 && <b>Quantity :</b>}
                    <div className={classes['order-quantity-manage']}>
                        <span>{items.quantity}</span>
                    </div>
                </div>
                <div className={classes['order-item-subtotal']}>{windowWidth <= 650 && <b>Subtotal :</b>}${items.subtotal.toFixed(2)}</div>
            </div>
        </div>
    )
}

export default OrderItems
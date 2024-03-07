import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom';
import classes from './Cart-total.module.css'
import Button from '../../../UI/Button/PrimaryButton'
import { RootState } from '../../../../ReduxTool/State/Store'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart } from '../../../../ReduxTool/Cart/ProductCartSlice'
import { Assets } from '../../../../Assets/Assets';
import { useLottie } from 'lottie-react';
import { useNavigate } from 'react-router';


const BackDrop: React.FC = () => {
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'auto', height: '100%', width: '100%',backgroundColor: 'rgba(240, 240, 240,0.301)', position: 'fixed', zIndex: '50'}} />
    );
};

const Checkout: React.FC = () => {

    const options = {
        animationData:  Assets.json.ConfirmOrder,
        loop: true
      };
    
      const { View } = useLottie(options);
    return (
        <div style={{position: 'fixed', height: '100%', width: '100%', zIndex: '51',display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}>
            {View}
        </div>
    )
}
const CartTotal = () => {
    const CartTotalSelector = useSelector((state: RootState) => state.ProductCart.cartItems)

    const dispatch = useDispatch()
const navigate = useNavigate()
    const [popup, setPopup] = useState<boolean>(false)
    // Calculate subtotal
    const subtotal = CartTotalSelector.reduce((total, item) => total + item.productDiscountPrice * item.productQuantity, 0);

    const handleCheckOut = () => {
        setPopup(true)
        setTimeout(() => {
            dispatch(emptyCart())
            navigate('/')
            setPopup(false)
        }, 3000)
    }
    useEffect(() => {
        // Add event listener to handle body overflow when component mounts
        document.body.style.overflow = 'hidden';
        // Remove event listener when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <React.Fragment>
            {popup &&
                <React.Fragment>
                    {ReactDom.createPortal(<Checkout />, document.getElementById('checkout-root')!)}
                    {ReactDom.createPortal(<BackDrop />, document.getElementById('backdrop-root')!)}
                </React.Fragment>
            }
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
                    onClick={handleCheckOut}>Checkout</Button></div>
        </React.Fragment>
    )
}

export default CartTotal
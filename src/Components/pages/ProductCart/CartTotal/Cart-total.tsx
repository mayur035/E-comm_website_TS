import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom';
import classes from './Cart-total.module.css'
import Button from '../../../UI/Button/PrimaryButton'
import { AppDispatch, RootState } from '../../../../ReduxTool/State/Store'
import { useDispatch, useSelector } from 'react-redux'
// import { emptyCart } from '../../../../ReduxTool/Cart/ProductCartSlice'
import { Assets } from '../../../../Assets/Assets';
import { useLottie } from 'lottie-react';
import { useNavigate } from 'react-router';
import { getUserDetails } from '../../../../ReduxTool/profileSlice';
import { ToastFunc } from '../../../../utils/ToastFun';
import { setShowUserEdit } from '../../../../ReduxTool/uiSlice';
import { CartItemtype } from '../../../../types/types';


const BackDrop: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', height: '100%', width: '100%', backgroundColor: 'rgba(240, 240, 240,0.301)', position: 'fixed', zIndex: '50' }} />
    );
};

const Checkout: React.FC = () => {

    const options = {
        animationData: Assets.json.ConfirmOrder,
        loop: true
    };

    const { View } = useLottie(options);
    return (
        <div style={{ position: 'fixed', height: '100%', width: '100%', zIndex: '51', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
            {View}
        </div>
    )
}
const CartTotal = () => {
    const CartTotalSelector = useSelector((state: RootState) => state.ProductCart.cartItems as []) 
       
    const subTotal = CartTotalSelector.reduce((total:number, item:CartItemtype)=>{
        const discount = Number( (item.productVariants.mrp - (item.productVariants.discount / 100) * item.productVariants.mrp).toFixed(0))
        return total + (discount*item.quantity)
    },0)

    useEffect(()=>{
        dispatch(getUserDetails())
    },[])
    
    const userDetails = useSelector((state: RootState) => state.ProfileSlice.userProfile as Record<string,string|number>)

    let nullFields = [];
            for (const key in userDetails) {
                if (userDetails[key] === null) {
                    nullFields.push(key);
                }
            }
    
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleCheckOut = async() => {
        await dispatch(getUserDetails())
        if(nullFields.length > 0 ){
            dispatch(setShowUserEdit())
            navigate('/profile')
            ToastFunc('Complete the profile',"error")
        }else{
            navigate('/address')
        }
        
    }
    return (
        <React.Fragment>
            <p className={classes['cart-total-heading']}>Cart total</p>
            <div className={classes['cart-subtotal']}>
                <p>Subtotal : </p>
                <p>${subTotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className={classes['cart-shipping']}>
                <p>Shipping : </p>
                <p>Free </p>
            </div>
            <hr />
            <div className={classes['cart-total']}>
                <p>Total : </p>
                <p>${subTotal.toFixed(2)}</p>
            </div>
            <div className={classes['checkout-btn']}>
                <Button
                    onClick={handleCheckOut}>Checkout</Button></div>
        </React.Fragment>
    )
}

export default CartTotal
import React, { useEffect } from 'react'
import Cart from '../Components/pages/ProductCart/Cart'
import { AppDispatch, RootState } from '../ReduxTool/State/Store';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../Assets/Assets';
import { Link } from 'react-router-dom';
import { getItems } from '../ReduxTool/ProductCartSlice';


const CartMain = () => {
  const cartSelector = useSelector((state: RootState) => state.ProductCart.cartItems as []); 
  
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getItems())
  }, [])
  return (
    <React.Fragment>
      {/* {cartSelector.isPopupVisible && <h1>hello</h1>} */}
      {cartSelector && cartSelector.length === 0 ?
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', height: '100%', width: '50%' }}>
          <h1>Cart is Empty</h1>
          <img src={Assets.images.AddtoCart} height='50%' width='50%' alt="" />
          <h5>
            <Link style={{ color: 'black' }} to='/productListing'>Let's Shopping something</Link>
          </h5>
        </div>
        : <Cart />}
    </React.Fragment>
  )
}

export default CartMain
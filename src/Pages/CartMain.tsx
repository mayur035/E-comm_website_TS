import React from 'react'
import Cart from '../Components/pages/ProductCart/Cart'
import { RootState } from '../ReduxTool/State/Store';
import { useSelector } from 'react-redux';
import { Assets } from '../Assets/Assets';
import { Link } from 'react-router-dom';

const CartMain = () => {
  const cartSelector = useSelector((state: RootState) => state.ProductCart);
  return (
    <React.Fragment>
      {/* {cartSelector.isPopupVisible && <h1>hello</h1>} */}
      {cartSelector.cartItems.length === 0 ?

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
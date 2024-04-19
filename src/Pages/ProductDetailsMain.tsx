import React from 'react'
import Clients from '../Components/UI/Clients/Clients'
import ProductPath from '../Components/UI/ProductPath/Product-Path'
import ProductDetails from '../Components/pages/ProductDetails/ProductDetail/ProductDetails'
import ProductDesc from '../Components/pages/ProductDetails/ProductDescription/ProductDesc'
import BestProduct from '../Components/pages/Home/BestSellerProduct/Best-Product'

const ProductDetailsMain = () => {
  return (
    <React.Fragment>
        <ProductPath/>
        <ProductDetails/>
        <ProductDesc />
        <BestProduct />
        <Clients/>
    </React.Fragment>
  )
}

export default ProductDetailsMain
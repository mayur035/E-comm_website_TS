import React from 'react'
import Clients from '../Components/UI/Clients/Clients'
import ProductPath from '../Components/UI/ProductPath/Product-Path'
import ProductDetails from '../Components/pages/ProductDetails/ProductDetail/ProductDetails'
import ProductDesc from '../Components/pages/ProductDetails/ProductDescription/ProductDesc'
import BestSellerProduct from '../Components/pages/ProductDetails/BestSellerProduct/BestSellerProduct'

const ProductDetailsMain = () => {
  return (
    <React.Fragment>
        <ProductPath/>
        <ProductDetails/>
        <ProductDesc/>
        <BestSellerProduct/>
        <Clients/>
    </React.Fragment>
  )
}

export default ProductDetailsMain
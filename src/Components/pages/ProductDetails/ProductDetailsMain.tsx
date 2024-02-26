import React from 'react'
import Clients from '../../UI/Clients/Clients'
import ProductPath from '../../UI/ProductPath/Product-Path'
import ProductDetails from './ProductDetail/ProductDetails'
import ProductDesc from './ProductDescription/ProductDesc'
import BestSellerProduct from './BestSellerProduct/BestSellerProduct'

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
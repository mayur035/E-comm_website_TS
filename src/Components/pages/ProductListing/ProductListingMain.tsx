import React from 'react'
import ProductPath from '../../UI/ProductPath/Product-Path'
import ProductCarousel from './ProductCarousel/Product-Carousel'
import ProductList from './ProductSection/ProductList'
import Clients from '../../UI/Clients/Clients'

const ProductListingMain = () => {
    return (
        <React.Fragment>
            <ProductPath />
            <ProductCarousel />
            <ProductList />
            <Clients />
        </React.Fragment>
    )
}

export default ProductListingMain
import React from 'react'
import ProductPath from '../Components/UI/ProductPath/Product-Path'
import ProductCarousel from '../Components/pages/ProductListing/ProductCarousel/Product-Carousel'
import ProductList from '../Components/pages/ProductListing/ProductSection/ProductList'
import Clients from '../Components/UI/Clients/Clients'

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
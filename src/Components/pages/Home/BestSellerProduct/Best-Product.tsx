import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../../UI/Card/ProductCard/Product-card';
import classes from './Best-Product.module.css'
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getBestProduct } from '../../../../ReduxTool/BestSellerSlice';
import { AppDispatch, RootState } from '../../../../ReduxTool/State/Store';
import { CircularProgress } from '@mui/material';
import { productVariantType} from '../../../../types/types';

const BestProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getBestProduct())
    }, [])
    const productSelector = useSelector((state: RootState) => state.BestSellerSlice);

    const products = productSelector.bestProduct as [];
    const errorState = productSelector.error as string;
    const statusState = productSelector.status as string;

    const randomProducts = [...products!];
    if (products) {
        for (let i = 0; i <= products?.length - 1; i++) {
            const randomNumber = Math.floor(Math.random() * products.length);
            const temp = randomProducts[i];
            randomProducts[i] = randomProducts[randomNumber];
            randomProducts[randomNumber] = temp;
        }
    }

    const limitedProducts = randomProducts.slice(0, 8)
    return (
        <React.Fragment>
            <div className={classes['product-container']}>
                <div className={classes['product-content']}>
                    <h4>Featured Products</h4>
                    <h3>BESTSELLER PRODUCTS</h3>
                    <p>Problems trying to resolve the conflict between</p>
                </div>
                {statusState === 'loading' && <CircularProgress />}
                {statusState === 'success' && <div className={classes['product-list']}>
                    {limitedProducts && limitedProducts.map((product: productVariantType) => (
                        <Link key={product.id} style={{ textDecoration: 'none' }} to={`/productDetails?productID=${product?.products?.id}&productName=${product?.products?.name}&productCategory=${product?.products?.categories.name}&productColor=${product.color}&productSize=${product.size}`}>
                            <ProductCard
                                key={product?.products?.id}
                                Image={{
                                    src: product?.image_keys.product_url,
                                    alt: 'best Seller product'
                                }}
                                productName={product?.products?.name!}
                                productBrand={product?.products?.brands.name}
                                productCategory={product?.products?.categories.name!}
                                productOriginalPrice={product.mrp}
                                productDiscountPrice={product.discount || 0}
                            />
                        </Link>
                    ))}
                </div>}
            </div>
        </React.Fragment>

    )
}

export default BestProduct
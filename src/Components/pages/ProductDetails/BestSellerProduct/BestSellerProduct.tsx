import { useDispatch, useSelector } from 'react-redux';
import BestSellingProduct from '../../../../Data/Best-selling-product'
import ProductCard from '../../../UI/Card/ProductCard/Product-card'
import classes from './BestSellerProduct.module.css'
// import { allProducts, fetch_product } from '../../../../ReduxTool/Data/ProductDataSlice';
import { useEffect } from 'react';

const BestSellerProduct = () => {
  // const dispatch = useDispatch();
  // const products = useSelector(allProducts);
  // useEffect(() => {
  //   dispatch(fetch_product())
  // }, [])
  return (
    // <div className={classes['best-seller-product-main']}>
    //   <div className={classes['best-seller-product-heading']}><h3>BESTSELLER PRODUCTS</h3></div>
    //   <hr />
    //   <div className={classes['product-list']}>
    //     {products.map((product: any, index: number) => (
    //       <ProductCard key={index} {...product} ColorChoice={false} />
    //     ))}
    //   </div>
    // </div>
    <></>
  )
}

export default BestSellerProduct
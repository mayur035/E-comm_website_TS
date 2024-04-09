import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../../UI/Card/ProductCard/Product-card';
import classes from './Best-Product.module.css'
import { Link } from 'react-router-dom';
// import { allProducts, fetch_product, productDataSelector } from '../../../../ReduxTool/Data/ProductDataSlice';
import { useEffect } from 'react';



const BestProduct = () => {
    // const dispatch = useDispatch();
    // const products = useSelector(allProducts);
    // useEffect(() => {
    //     dispatch(fetch_product())
    // }, [])

    return (
        // <div className={classes['product-container']}>
        //     <div className={classes['product-content']}>
        //         <h4>Featured Products</h4>
        //         <h3>BESTSELLER PRODUCTS</h3>
        //         <p>Problems trying to resolve the conflict between</p>
        //     </div>
        //     <div className={classes['product-list']}>
        //         {products.map((product: any) => (
        //             <Link key={product.id} style={{ textDecoration: 'none' }} to={`/productDetails/${product.id}`}>
        //                 <ProductCard key={product.id} {...product} ColorChoice={true} />
        //             </Link>
        //         ))}
        //     </div>
        // </div>
        <></>
    )
}

export default BestProduct
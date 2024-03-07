import { useSelector } from 'react-redux';
import ProductCard from '../../../UI/Card/ProductCard/Product-card';
import classes from './Best-Product.module.css'
import { Link } from 'react-router-dom';
import { productDataSelector } from '../../../../ReduxTool/Data/ProductDataSlice';



const BestProduct = () => {
    const ProductData = useSelector(productDataSelector)    
    return (
        <div className={classes['product-container']}>
            <div className={classes['product-content']}>
                <h4>Featured Products</h4>
                <h3>BESTSELLER PRODUCTS</h3>
                <p>Problems trying to resolve the conflict between</p>
            </div>
            <div className={classes['product-list']}>
                {ProductData.map((product) => (
                    <Link key={product.id} style={{ textDecoration: 'none' }} to={`/productDetails/${product.id}`}>
                        <ProductCard key={product.id} {...product} ColorChoice={true} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BestProduct
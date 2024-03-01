import ProductCard from '../../../UI/Card/ProductCard/Product-card';
import BestSellingProduct from '../../../../Data/Best-selling-product';
import classes from './Best-Product.module.css'
import { Link, useParams } from 'react-router-dom';



const BestProduct = () => {
    return (
        <div className={classes['product-container']}>
            <div className={classes['product-content']}>
                <h4>Featured Products</h4>
                <h3>BESTSELLER PRODUCTS</h3>
                <p>Problems trying to resolve the conflict between</p>
            </div>
            <div className={classes['product-list']}>
                {BestSellingProduct.map((product) => (
                    <Link key={product.id} style={{ textDecoration: 'none' }} to={`/productDetails/${product.id}`}>
                        <ProductCard key={product.id} {...product} ColorChoice={true} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BestProduct
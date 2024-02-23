import ProductCard from '../../../UI/Card/Product-card';
import BestSellingProduct from '../../../../Data/Best-selling-product';
import classes from './Best-Product.module.css'

const BestProduct = () => {
    return (
        <div className={classes['product-container']}>
            <div className={classes['product-content']}>
                <h4>Featured Products</h4>
                <h3>BESTSELLER PRODUCTS</h3>
                <p>Problems trying to resolve the conflict between</p>
            </div>
            <div className={classes['product-list']}>
                {BestSellingProduct.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        </div>
    )
}

export default BestProduct
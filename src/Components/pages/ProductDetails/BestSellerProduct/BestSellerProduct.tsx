import BestSellingProduct from '../../../../Data/Best-selling-product'
import ProductCard from '../../../UI/Card/ProductCard/Product-card'
import classes from './BestSellerProduct.module.css'

const BestSellerProduct = () => {
  return (
    <div className={classes['best-seller-product-main']}>
      <div className={classes['best-seller-product-heading']}><h3>BESTSELLER PRODUCTS</h3></div>
      <hr />
      <div className={classes['product-list']}>
        {BestSellingProduct.map((product, index) => (
          <ProductCard key={index} {...product} ColorChoice={false} />
        ))}
      </div>
    </div>
  )
}

export default BestSellerProduct
import ProductCard from '../../../UI/Card/Product-card';
import BestSellingProduct from '../../../../Data/Best-selling-product';

const BestProduct = () => {
    return (
        <>
            {BestSellingProduct.map((product, index) => (
                <ProductCard key={index} {...product} />
            ))}
        </>
    )
}

export default BestProduct
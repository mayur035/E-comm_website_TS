import classes from './Product-card.module.css'
import { Assets } from '../../../Assets/Assets';


type cardProps={
    Image:{
        src:string;
        alt:string;
    },
    productName:string;
    productCategory:string;
    productOriginalPrice:number;
    productDiscountPrice:number;
};

const ProductCard = (props:cardProps) => {
    return (
        <div className={classes['card-container']}>
            <img src={props.Image.src} alt={props.Image.alt} />
            <div className={classes['card-content']}>
                <h5>{props.productName}</h5>
                <p>{props.productCategory}</p>
                <div className={classes['product-price']}>
                    <h5 style={{color:'#BDBDBD'}}>${props.productOriginalPrice}</h5>
                    <h5 style={{color:'#23856D'}}>${props.productDiscountPrice}</h5>
                </div>
                <div><img src={Assets.images.product_color} alt="color" /></div>
            </div>
        </div>
    )
}

export default ProductCard
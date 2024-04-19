import classes from './Product-card.module.css'
import { Assets } from '../../../../Assets/Assets';
import {Colordot} from '../../colorSize/color_Size';
type cardProps = {
    Image: {
        src: string;
        alt: string;
    },
    productName: string;
    productCategory: string;
    productOriginalPrice: number;
    productBrand?: string;
    productDiscountPrice: number;
    colors?: string[] | null
};

const ProductCard = (props: cardProps) => {
    return (
        <div className={classes['card-container']}>
            <div className={classes['product-image']}>
                <img width={'100%'} height={'100%'} src={props.Image.src} alt={props.Image.alt} />
            </div>
            <div className={classes['card-content']}>
                <h5>{props.productName}</h5>
                <p>{props.productCategory}</p>
                <p>{props.productBrand}</p>
                <div className={classes['product-price']}>
                    {props.productDiscountPrice !== 0 && <h5 style={{ color: '#BDBDBD' }}><del>${props.productOriginalPrice}</del></h5>}
                    <h5 style={{ color: '#23856D' }}>${(props.productOriginalPrice - (props.productDiscountPrice / 100) * props.productOriginalPrice).toFixed(0)}{props.productDiscountPrice !== 0 && <span>({props.productDiscountPrice}% Off)</span>}</h5>
                </div>
                <div className={classes.color}>
                {props.colors?.map((color,index) => {
                    return <span key={index}><Colordot color={color} /></span>
                })}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
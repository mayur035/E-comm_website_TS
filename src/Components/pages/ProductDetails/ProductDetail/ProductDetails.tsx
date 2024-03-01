import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility, VisibilityTwoTone } from '@mui/icons-material'
import { Assets } from '../../../../Assets/Assets'
import classes from './ProductDetails.module.css'
import React from 'react'
import Button from '../../../UI/Button/PrimaryButton'

const ProductDetails = () => {
    return (
        <div className={classes['product-details-main']}>
            <div className={classes['product-details-image']}>image</div>
            
            <div className={classes['product-details-content-main']}>
                <div className={classes['product-details-content-inner']}>
                    <h4>Floating Phone</h4>
                    <div className={classes.rating}><img src={Assets.images.stars} alt="stars" /><h6>10 reviews</h6></div>
                    <h3 className={classes.price}>$1,139.33</h3>
                    <div className={classes['availability']}>
                        <h6 className={classes.checkAva}>Availability  :</h6>
                        <h6 className={classes.inStock}>In Stock</h6>
                    </div>
                    <p>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.Excitation venial consequent sent nostrum met.</p>
                    <hr />
                    <div className={classes.color}>
                        <img src={Assets.images.product_color} alt="" />
                    </div>
                    <div className={classes.options}>
                        <Button buttonType={'primary'} >Select Option</Button>
                        <div className={classes['like-cart-visible']}>
                            <FavoriteBorderOutlined className={classes.icon} />
                            <ShoppingCartOutlined className={classes.icon} />
                            <Visibility className={classes.icon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
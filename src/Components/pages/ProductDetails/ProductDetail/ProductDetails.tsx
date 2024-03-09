import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility } from '@mui/icons-material'
import { Assets } from '../../../../Assets/Assets'
import classes from './ProductDetails.module.css'
import Button from '../../../UI/Button/PrimaryButton'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../../ReduxTool/Cart/ProductCartSlice'
import { redirect, useParams } from 'react-router'
import { RootState } from '../../../../ReduxTool/State/Store'
import { ToastFunc } from '../../../../utils/ToastFun'

const ProductDetails = () => {
    // const cartSelector = useSelector((state:RootState) =>state.ProductCart.cartItems)
    const { productID } = useParams();
    const dispatch = useDispatch();
    const checkAuthUser = useSelector((state: RootState) => state.AuthUserData.token);
    console.log(checkAuthUser);

    const ClickToAdd = () => {
        if (checkAuthUser) {
            dispatch(addToCart(productID))
            ToastFunc("Product added to cart", 'success')
        } else {
            redirect('/signup')
            ToastFunc("Please Register", "error")
        }
    }

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
                        <Button buttonType='solid' buttonColor='blue' >Select Option</Button>
                        <div className={classes['like-cart-visible']}>
                            <IconButton><FavoriteBorderOutlined className={classes.icon} /></IconButton>
                            <IconButton onClick={ClickToAdd}><ShoppingCartOutlined className={classes.icon} /></IconButton>
                            <IconButton><Visibility className={classes.icon} /></IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
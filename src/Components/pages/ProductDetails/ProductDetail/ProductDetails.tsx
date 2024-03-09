import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility } from '@mui/icons-material'
import { Assets } from '../../../../Assets/Assets'
import classes from './ProductDetails.module.css'
import Button from '../../../UI/Button/PrimaryButton'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../../ReduxTool/Cart/ProductCartSlice'
import { useNavigate, useParams } from 'react-router'
import { RootState } from '../../../../ReduxTool/State/Store'
import { ToastFunc } from '../../../../utils/ToastFun'

const ProductDetails = () => {
    const cartSelector = useSelector((state: RootState) => state.ProductCart.cartItems)
    const productList = useSelector((state: RootState) => state.ProductData)
    console.log(productList);
    
    console.log(cartSelector);
    
    const navigate = useNavigate();
    const { productID } = useParams();
    const dispatch = useDispatch();
    const checkAuthUser = useSelector((state: RootState) => state.AuthUserData.token);

    const isAlreadyInCart = cartSelector.find((item) => item.id === productID)
    const productDetail = productList.find((item)=>item.id === productID)
    console.log(productDetail);
    
    
    const ClickToAdd = () => {
        if (checkAuthUser) {
            if (isAlreadyInCart) {
                ToastFunc('Product is already in cart', "warn")
                return;
            }
            dispatch(addToCart(productID))
            ToastFunc("Product added to cart", 'success')
        } else {
            ToastFunc("Please Register", "error")
            navigate('/signup')
        }
    }

    return (
        <div className={classes['product-details-main']}>
            <div className={classes['product-details-image']}>
                <img src={productDetail?.Image.src} alt={productDetail?.Image.alt} />
            </div>

            <div className={classes['product-details-content-main']}>
                <div className={classes['product-details-content-inner']}>
                    <h4>{productDetail?.productName}</h4>
                    <div className={classes.rating}><img src={Assets.images.stars} alt="stars" /><h6>10 reviews</h6></div>
                    <h3 className={classes.price}><span style={{color:'#737373'}}><del>${productDetail?.productOriginalPrice}</del></span> ${productDetail?.productDiscountPrice}</h3>
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
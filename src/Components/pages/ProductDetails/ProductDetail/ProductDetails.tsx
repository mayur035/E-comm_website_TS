import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility } from '@mui/icons-material'
import { Assets } from '../../../../Assets/Assets'
import classes from './ProductDetails.module.css'
import Button from '../../../UI/Button/PrimaryButton'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../../ReduxTool/Cart/ProductCartSlice'
import { useLocation, useNavigate, useParams } from 'react-router'
import { RootState } from '../../../../ReduxTool/State/Store'
import { ToastFunc } from '../../../../utils/ToastFun'
import { useEffect } from 'react'
import { fetchProductDetail } from '../../../../ReduxTool/Data/productDetailsSlice'
// import { allProducts } from '../../../../ReduxTool/Data/ProductDataSlice'

const ProductDetails = () => {
    const location = useLocation();
    
    const product_Detail = useSelector((state: RootState) => state.productDetailsSlice.productDetails)
    const product = product_Detail?.data.findProductDetails[0];
    console.log(product);
    
    
    const cartSelector = useSelector((state: RootState) => state.ProductCart.cartItems)

    const navigate = useNavigate();
    const { productID, productName, productCategory } = useParams();
    const dispatch = useDispatch();
    const checkAuthUser = useSelector((state: RootState) => state.AuthUserData.token);
    
    
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const productID = searchParams.get('productID');
        // const productName = searchParams.get('productName');
        // const productCategory = searchParams.get('productCategory');
        // console.log('Product ID:', productID);
        // console.log('Product Name:', productName);
        // console.log('Product Category:', productCategory);
        dispatch(fetchProductDetail({productId:productID}))
    }, [location]);
    
    const isAlreadyInCart = cartSelector.find((item) => item.id === productID)

    const ClickToAdd = () => {
        if (checkAuthUser) {
            if (isAlreadyInCart) {
                ToastFunc('Product is already in cart', "warn")
                return;
            }
            dispatch(addToCart(productID))
            ToastFunc("Product added to cart", 'success')
        } else {
            ToastFunc("Please Register/Login", "error")
            navigate('/login')
        }
    }
    const discountPrice =product && ((product?.productVariants[0].mrp) - (product?.productVariants[0].mrp)*(product?.productVariants[0].discount/100))
    return (
        <div className={classes['product-details-main']}>
            <div className={classes['product-details-image']}>
                <img width='100%' height='80%' src={product?.productVariants[0].image_keys.product_url} alt='product image' />
            </div>

            <div className={classes['product-details-content-main']}>
                <div className={classes['product-details-content-inner']}>
                    <h4>{product?.name}</h4>
                    <div className={classes.rating}><img src={Assets.images.stars} alt="stars" /><h6>10 reviews</h6></div>
                    <div className={classes['availability']}>
                        <h6 className={classes.checkAva}>Availability  :</h6>
                        <h6 className={classes.inStock}>In Stock</h6>
                    </div>
                    <h3 className={classes.price}><span style={{ color: '#737373' }}><del>${product?.productVariants[0].mrp}</del></span> ${discountPrice}<h6 style={{color:"#737373"}}>({product?.productVariants[0].discount}% off)</h6></h3>
                    
                    <p>{product?.productVariants[0].description}</p>
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
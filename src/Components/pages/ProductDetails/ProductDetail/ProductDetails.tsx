import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility } from '@mui/icons-material'
import { Assets } from '../../../../Assets/Assets'
import classes from './ProductDetails.module.css'
import Button from '../../../UI/Button/PrimaryButton'
import { IconButton, Rating } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
// import { addToCart } from '../../../../ReduxTool/Cart/ProductCartSlice'
import { useLocation, useNavigate, useParams } from 'react-router'
import { AppDispatch, RootState } from '../../../../ReduxTool/State/Store'
import { ToastFunc } from '../../../../utils/ToastFun'
import { useEffect, useState } from 'react'
import { fetchProductDetail } from '../../../../ReduxTool/productDetailsSlice'
import { Colordot, SizeBox } from '../../../UI/colorSize/color_Size'
import { getItems, postItems } from '../../../../ReduxTool/ProductCartSlice'
// import { allProducts } from '../../../../ReduxTool/Data/ProductDataSlice'

const ProductDetails = () => {
    const location = useLocation();

    const product_Detail = useSelector((state: RootState) => state.productDetailsSlice.productDetails)
    const product = product_Detail?.ProductDetails;
    const colors = product_Detail?.allColors;
    const sizes = product_Detail?.allSizes;        

    // const cartSelector = useSelector((state: RootState) => state.ProductCart.cartItems)

    const dispatch = useDispatch<AppDispatch>();
    const checkAuthUser = useSelector((state: RootState) => state.AuthUserData.token);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const productID = searchParams.get('productID');
        const productColor = searchParams.get('productColor');
        const productSize = searchParams.get('productSize');
        dispatch(fetchProductDetail({ productID, productColor, productSize }))
    }, [location]);

    const discountPrice = product && ((product?.productVariants?.mrp) - (product?.productVariants?.mrp) * (product?.productVariants?.discount / 100))

    const colorClickManage = (productID: number | undefined, productColor: string | undefined, productSize: string | undefined) => {

        if (productID !== undefined && productColor !== undefined) {
            dispatch(fetchProductDetail({ productID, productColor, productSize }))   
        } else {
            console.error('Product ID is undefined');
        }
    }

    return (
        <div className={classes['product-details-main']}>
            <div className={classes['product-details-image']}>
                <img width='100%' height='80%' src={product?.productVariants?.image_keys.product_url} alt='product image' />
            </div>

            <div className={classes['product-details-content-main']}>
                <div className={classes['product-details-content-inner']}>
                    <h4>{product?.name}</h4>
                    <div className={classes.rating}><Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly/><h6>10 reviews</h6></div>
                    <div className={classes['availability']}>
                        <h5 className={classes.checkAva}>Availability  : </h5>
                        <h5
                            className={classes.inStock}
                            style={{
                                color: `${product?.productVariants?.in_stock ? 'green' : 'red'}`,
                            }}
                        >
                            {product?.productVariants?.in_stock ? 'In stock' : 'Out of stock'}
                        </h5>

                    </div>
                    <h3 className={classes.price}><span style={{ color: '#737373' }}><del>${product?.productVariants?.mrp}</del></span> ${discountPrice}<span style={{ fontSize: '15px', color: "#737373" }}>({product?.productVariants?.discount}% off)</span></h3>

                    <p>{product?.productVariants?.description}</p>
                    <hr />
                    <div className={classes.color}>
                        {colors?.map((color, index) => {
                            return <div key={index} className={classes.colorDot} style={{ cursor: 'pointer' }} onClick={(e) => {
                                colorClickManage(product?.id, color, undefined)
                            }}><Colordot color={color} selectedColor={product?.productVariants?.color} /></div>
                        })}
                    </div>
                    <div className={classes.options}>
                        {sizes?.map((size, index) => (
                            <div key={index} onClick={() => colorClickManage(product?.id, product?.productVariants.color, size)}>
                                <SizeBox size={size} selectedSize={product?.productVariants?.size} />
                            </div>
                        ))}
                    </div>
                    <div className={classes['like-cart-visible']}>
                        <IconButton style={{ color: 'black' }}><FavoriteBorderOutlined className={classes.icon} /></IconButton>
                        {product && product?.productVariants.in_stock && <IconButton style={{ color: 'black' }}
                            onClick={async () => {
                                await dispatch(postItems(product?.productVariants.id))
                                dispatch(getItems())
                            }
                            }
                        ><ShoppingCartOutlined className={classes.icon} /></IconButton>}
                        {/* <IconButton><Visibility className={classes.icon} /></IconButton> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetails
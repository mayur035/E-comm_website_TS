import { FavoriteBorderOutlined, PersonOutlineOutlined, ShoppingCartOutlined, Menu, Close, Logout, AccountCircleOutlined } from '@mui/icons-material'
import classes from './Light-Nav.module.css'
import { useEffect, useState } from 'react'
import Logo from '../../UI/logo/Logo'
import { Link } from 'react-router-dom'
import { Badge, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../ReduxTool/State/Store'
import { logOut } from '../../../ReduxTool/AuthDataSlice'
import { getItems } from '../../../ReduxTool/ProductCartSlice'
import { setHideUserEdit, setShowUserEdit } from '../../../ReduxTool/uiSlice'
// import { emptyCart } from '../../../ReduxTool/Cart/ProductCartSlice'


const LightNavbar = () => {
    const [Mobile, setMobile] = useState<boolean>(false)
    const [profileBox, setprofileBox] = useState<boolean>(false)

    const dispatch = useDispatch();
    const dataSelector = useSelector((state: RootState) => state.AuthUserData.token)
    const showEdit = useSelector((state: RootState) => state.UISlice.showUserEdit)

    const CartItemSelector = useSelector((state: RootState) => state.ProductCart.cartItems as [])
    const numberOfCartItems = CartItemSelector && CartItemSelector.length;

    const toggleMobileMenu = () => {
        setMobile(!Mobile);
    }

    const closeMobileMenu = () => {
        setMobile(false);
    }

    const openProfile = () => {
        // setMobile(false);
        setprofileBox(!profileBox)
    }

    return (
        <section id={classes['light-header']}>
            <div className={classes.container}>
                <Logo />
                <div className={`${classes.menu} ${Mobile ? classes['menu-res'] : ""}`}>
                    <ul>
                        <li><Link to='/' onClick={closeMobileMenu}>Home</Link></li>
                        <li><Link to='/productListing' onClick={closeMobileMenu}>Shop</Link></li>
                        <li><Link to='/aboutUs' onClick={closeMobileMenu}>About</Link></li>
                        <li><a href="#" onClick={closeMobileMenu}>Blog</a></li>
                        <li><Link to='/contactUs' onClick={closeMobileMenu}>Contact</Link></li>
                        <li><a href="#" onClick={closeMobileMenu}>Pages</a></li>
                    </ul>
                    <ul>
                        {dataSelector ?
                            <li onClick={() => {
                                dispatch(logOut())
                                // dispatch(emptyCart())
                            }}><Logout />LogOut</li> :
                            <li><Link to='/login' onClick={closeMobileMenu}><PersonOutlineOutlined />Login/Signup</Link></li>
                        }
                        {!Mobile && dataSelector && <li>
                            <div className={classes['popup-box']}>
                                <div onClick={openProfile}><AccountCircleOutlined /></div>
                                {profileBox && <div className={classes['user-profile-box']}>
                                    <div className={classes['options']}>Hello,Patel!</div>
                                    <Link to='/profile' onClick={() => { setprofileBox(!profileBox); dispatch(setHideUserEdit()) }} className={classes['options']}>User Profile</Link>
                                    <Link to='/profile' onClick={() => { setprofileBox(!profileBox); dispatch(setShowUserEdit()) }} className={classes['options']}>Edit Profile</Link>
                                    <Link to='/orderListing' onClick={openProfile} className={classes['options']}>OrderHistory</Link>
                                    <Link to='' onClick={openProfile} className={classes['options']}>Help</Link>
                                </div>}
                            </div>
                        </li>}
                        <li><Link to='/cart' onClick={closeMobileMenu}><Badge badgeContent={numberOfCartItems} color="primary"><ShoppingCartOutlined /></Badge></Link></li>
                        <li><a href="#" onClick={closeMobileMenu}><FavoriteBorderOutlined /></a></li>
                    </ul>
                </div>
                <div className={classes['res-Nav']}>
                    {Mobile ? <IconButton onClick={toggleMobileMenu}><Close /></IconButton> : <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><div className={classes['popup-box']}>
                        <div onClick={openProfile}><AccountCircleOutlined /></div>
                        {profileBox && dataSelector && <div className={classes['user-profile-box']}>
                            <div className={classes['options']}>Hello,Patel!</div>
                            <Link to='/profile' onClick={() => dispatch(setHideUserEdit())} className={classes['options']}>User Profile</Link>
                            <Link to='/profile' onClick={() => { dispatch(setHideUserEdit()) }} className={classes['options']}>Edit Profile</Link>
                            <Link to='/orderListing' onClick={openProfile} className={classes['options']}>OrderHistory</Link>
                            <Link to='' onClick={openProfile} className={classes['options']}>Help</Link>
                        </div>}
                    </div>
                        <IconButton onClick={toggleMobileMenu}><Menu /></IconButton>
                    </div>}
                </div>
            </div>
        </section>
    )
}

export default LightNavbar

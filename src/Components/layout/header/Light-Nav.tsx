import { FavoriteBorderOutlined, PersonOutlineOutlined, SearchOutlined, ShoppingCartOutlined, Menu, Close } from '@mui/icons-material'
import classes from './Light-Nav.module.css'
import { useState } from 'react'
import Logo from '../../UI/logo/Logo'
import { Link } from 'react-router-dom'
import { Badge } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../ReduxTool/State/Store'


const LightNavbar = () => {
    const [Mobile, setMobile] = useState<boolean>(false)

    const CartItemSelector = useSelector((state: RootState) => state.ProductCart.cartItems)
    const numberOfCartItems = CartItemSelector.length;


    const toggleMobileMenu = () => {
        setMobile(!Mobile);
    }

    const closeMobileMenu = () => {
        setMobile(false);
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
                        <li><Link to='/signup' onClick={closeMobileMenu}><PersonOutlineOutlined /> Login/Signup</Link></li>
                        <li><a href="#" onClick={closeMobileMenu}><SearchOutlined /></a></li>
                        <li><Link to='/cart' onClick={closeMobileMenu}><Badge badgeContent={numberOfCartItems} color="primary"><ShoppingCartOutlined /></Badge></Link></li>
                        <li><a href="#" onClick={closeMobileMenu}><FavoriteBorderOutlined /></a></li>
                    </ul>
                </div>
                <button onClick={toggleMobileMenu} className={classes['res-Nav']}>
                    {Mobile ? <Close /> : <Menu />}
                </button>
            </div>
        </section>
    )
}

export default LightNavbar

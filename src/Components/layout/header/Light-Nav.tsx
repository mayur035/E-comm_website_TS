import { FavoriteBorderOutlined, PersonOutlineOutlined, SearchOutlined, ShoppingCartOutlined, Menu, Close } from '@mui/icons-material'
import classes from './Light-Nav.module.css'
import { useState } from 'react'
import Logo from '../../UI/logo/Logo'
import { Link } from 'react-router-dom'


const LightNavbar = () => {
    const [Mobile, setMobile] = useState<boolean>(false)

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
                        <li><a href="#"><PersonOutlineOutlined /> Login/Signup</a></li>
                        <li><a href="#"><SearchOutlined /></a></li>
                        <li><Link to='/cart' onClick={closeMobileMenu}><ShoppingCartOutlined /></Link></li>
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

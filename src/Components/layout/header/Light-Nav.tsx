import { FavoriteBorderOutlined, PersonOutlineOutlined, SearchOutlined, ShoppingCartOutlined, Menu, Close } from '@mui/icons-material'
import classes from './Light-Nav.module.css'
import { useState } from 'react'
import Logo from '../../UI/logo/Logo'
import { Link } from 'react-router-dom'


const LightNavbar = () => {
    const [Mobile, setMobile] = useState<boolean>(false)
    return (
        <section id={classes['light-header']}>
            <div className={classes.container}>
                <Logo/>
                <div className={`${classes.menu} ${Mobile ? classes['menu-res'] : ""}`}>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/productListing'>Shop</Link></li>
                        <li><Link to='/aboutUs'>About</Link></li>
                        <li><a href="#">Blog</a></li>
                        <li><Link to='/contactUs'>Contact</Link></li>
                        <li><a href="#">Pages</a></li>
                    </ul>
                    <ul>
                        <li><a href="#"><PersonOutlineOutlined /> Login/Signup</a></li>
                        <li><a href="#"><SearchOutlined /></a></li>
                        <li><Link to='/cart'><ShoppingCartOutlined /></Link></li>
                        <li><a href="#"><FavoriteBorderOutlined /></a></li>
                    </ul>
                </div>
                <button onClick={() => { setMobile(!Mobile) }} className={classes['res-Nav']}>
                    {Mobile ? <Close /> : <Menu />}
                </button>
            </div>
        </section>
    )
}

export default LightNavbar
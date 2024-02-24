import { FavoriteBorderOutlined, PersonOutlineOutlined, SearchOutlined, ShoppingCartOutlined, Menu, Close } from '@mui/icons-material'
import classes from './Light-Nav.module.css'
import { useState } from 'react'
import Logo from '../../UI/logo/Logo'


const LightNavbar = () => {
    const [Mobile, setMobile] = useState<boolean>(false)
    return (
        <section id={classes['light-header']}>
            <div className={classes.container}>
                <Logo/>
                <div className={`${classes.menu} ${Mobile ? classes['menu-res'] : ""}`}>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Shop</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Pages</a></li>
                    </ul>
                    <ul>
                        <li><a href="#"><PersonOutlineOutlined /> Login/Signup</a></li>
                        <li><a href="#"><SearchOutlined /></a></li>
                        <li><a href="#"><ShoppingCartOutlined /></a></li>
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
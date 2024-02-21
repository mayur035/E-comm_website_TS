import React from 'react'
import DarkNavbar from './Dark-nav'
import LightNavbar from './Light-Nav'

const Header = () => {
    return (
        <React.Fragment>
            <DarkNavbar/>
            <LightNavbar/>
        </React.Fragment>
    )
}

export default Header
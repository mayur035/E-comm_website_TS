import React, { Children, useState } from 'react'
import classes from './Drawer.module.css'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

const Drawer:React.FC<{
    setIsShow:React.Dispatch<React.SetStateAction<boolean>>;
    children:React.ReactNode
}> = ({setIsShow,children}) => {
    
    // close and open the accordion
    const handleDrawer=()=>{
        setIsShow(false)
    }
    return (
        <div className={classes.drawer_main}>
            <div className={classes['drawer-header']}><h2>Filter</h2><IconButton onClick={handleDrawer}><Close /></IconButton></div>
            {children}
        </div>
    )
}

export default Drawer
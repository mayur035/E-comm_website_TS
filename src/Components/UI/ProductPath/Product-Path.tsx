import React from 'react'
import classes from './Product-Path.module.css'
import { ChevronRight } from '@mui/icons-material'
const ProductPath = () => {
  return (
    <div className={classes['product-path']}>
        <div className={classes['product-container']}>
        <h3>Shop</h3>
        <div className={classes.ShowPath}><a>Home</a><ChevronRight htmlColor='#BDBDBD'/><h6>Shop</h6></div>
        </div>
    </div>
  )
}

export default ProductPath
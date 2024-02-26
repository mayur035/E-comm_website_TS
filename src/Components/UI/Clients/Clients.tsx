import classes from './Clients.module.css'
import React from 'react'
import { Assets } from '../../../Assets/Assets'

const Clients = () => {
    return (
        <div className={classes['client-container']}>
            <img src={Assets.images.hooli} alt="Hooli" />
            <img src={Assets.images.lya} alt="lya" />
            <img src={Assets.images.leaf} alt="Leaf" />
            <img src={Assets.images.stripe} alt="stripe" />
            <img src={Assets.images.aws} alt="aws" />
            <img src={Assets.images.raddit} alt="Raddit" />
        </div>
    )
}

export default Clients
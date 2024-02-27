import React from 'react'
import classes from './bigCompany.module.css'
import Clients from '../../../UI/Clients/Clients'

const BigCompany = () => {
    return (
        <div className={classes['big-company-main']}>
            <div className={classes['big-company-header']}>
                <h2>Big Companies Are Here</h2>
                <p>Problems trying to resolve the conflict between
                    the two major realms of Classical physics: Newtonian mechanics </p>
            </div>
            <Clients />
        </div>
    )
}

export default BigCompany
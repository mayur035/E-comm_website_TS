import React from 'react'
import classes from './ProblemType.module.css'

const ProblemType = () => {
    return (
        <div className={classes['problemtype-main']}>
            <div className={classes['problemtype-inner']}>
                <div className={classes['problemtype-left']}>
                    <p className={classes['problemtype-left-text']}>Problems trying</p>
                    <h3 className={classes['problemtype-text-3']}>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.</h3>
                </div>
                <div className={classes['problemtype-right']}>
                    <p className={classes['problemtype-right-text']}>Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics </p>
                </div>
            </div>
        </div>
    )
}

export default ProblemType
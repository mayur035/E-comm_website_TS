import React from 'react'
import classes from './Header.module.css'

const Header = () => {
    return (
        <React.Fragment>
            <section id={classes['dark-header']}>
                <div className={classes.container}>
                    <div className={classes.contact}></div>
                    <div className={classes.offer}></div>
                    <div className={classes.follow}></div>
                </div>
            </section>
            <section id={classes['light-header']}>
            <div className={classes.container}>
                
            </div>
            </section>


        </React.Fragment>
    )
}

export default Header
import React from 'react'
import classes from './AboutUsStates.module.css'

const AboutUsStates = () => {
  return (
    <div className={classes['statistics-main']}>
        <div>
        <h1 className={classes['statistics-head1']}>15K</h1>
        <h5 className={classes['statistics-head5']}>Happy Customers</h5>
        </div>
        <div>
        <h1 className={classes['statistics-head1']}>150K</h1>
        <h5 className={classes['statistics-head5']}>Monthly Visitors</h5>
        </div>
        <div>
        <h1 className={classes['statistics-head1']}>15</h1>
        <h5 className={classes['statistics-head5']}>Countries  Worldwide</h5>
        </div>
        <div>
        <h1 className={classes['statistics-head1']}>100+</h1>
        <h5 className={classes['statistics-head5']}>Top Partners</h5>
        </div>
    </div>
  )
}

export default AboutUsStates
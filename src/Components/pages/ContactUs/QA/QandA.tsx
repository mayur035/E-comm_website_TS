import React from 'react'
import classes from './QandA.module.css'
const QandA = () => {
    return (
        <section className={classes['q-a-main']}>
            <div className={classes['q-a-inner-main']}>
                <h2 className={classes['q-a-head2']}>Questions & Answers</h2>
                <p className={classes['q-a-para']}>Problems trying to resolve the conflict between the two major realms of Classical physics: </p>
                <h6 className={classes['q-a-head6']}>Contact Us</h6>
            </div>
        </section>
    )
}

export default QandA
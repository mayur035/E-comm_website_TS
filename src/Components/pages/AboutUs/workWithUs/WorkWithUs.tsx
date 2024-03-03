import { Assets } from '../../../../Assets/Assets'
import Button from '../../../UI/Button/PrimaryButton'
import classes from './WorkWithUs.module.css'
import React from 'react'

const WorkWithUs = () => {
    return (
        <div className={classes['work-with-us-main']}>
            <div className={classes['work-with-us-main-inner']}>
                <div className={classes['work-with-us-content']}>
                    <div className={classes['work-with-us-inner-content']}>
                        <h5>WORK WITH US</h5>
                        <h2>Now Let's grow Yours</h2>
                        <p>The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th </p>
                    <Button buttonType='outline' buttonColor='blue'>Contact us</Button>
                    </div>
                </div>
                <div className={classes['hero-img']}>
                    <img className={classes['work-with-us-img']} src={Assets.images.WorkWithUSGirl} alt="WorkWithUSGirl" />
                </div>
            </div>
        </div>
    )
}

export default WorkWithUs
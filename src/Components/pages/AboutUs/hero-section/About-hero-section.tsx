import { Assets } from '../../../../Assets/Assets'
import Button from '../../../UI/Button/PrimaryButton'
import classes from './About-hero-section.module.css'
import React from 'react'

const AboutHeroSection = () => {
    return (
        <div className={classes['about-hero-section-main']}>
            <div className={classes['about-hero-section-inner']}>
                <section className={classes['about-hero-section-content']}>
                    <h5 className={classes['about-hero-h5']}>About Company</h5>
                    <h1 className={classes['about-hero-h1']}>ABOUT US</h1>
                    <h4 className={classes['about-hero-h4']}>We know how large objects will act,but things on a small scale</h4>
                    <Button buttonColor='blue' buttonType='solid' >Get Quote Now</Button>
                </section>
                <section className={classes['about-hero-section-hero']}>
                    <div style={{position:'relative'}}>

                    <img src={Assets.images.aboutHero} alt="HeroImage" className={classes['about-hero']} />
                    <div className={classes['ellipse-purple-1']}/>
                    <div className={classes['ellipse-purple-2']}/>
                    <div className={classes['ellipse-pink-1']}/>
                    <div className={classes['ellipse-pink-2']}/>
                    <div className={classes['ellipse-pink-3']}/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AboutHeroSection
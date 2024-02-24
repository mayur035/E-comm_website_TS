import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import Logo from '../../UI/logo/Logo'
import classes from './Footer.module.css'

import React from 'react'
import Button from '../../UI/Button/PrimaryButton'

const Footer = () => {
    return (
        <footer className={classes['footer-main-container']}>
            <div className={classes['footer-container']}>
                <section className={classes['footer-logo-social']}>
                    <Logo />
                    <div className={classes.social}>
                        <Instagram />
                        <Facebook/>
                        <Twitter/>
                    </div>
                </section>
                <section className={classes['footer-main-section']}>
                    <div className={classes['footer-content']}>
                        <div className={classes['footer-cols']}>
                            <h5>Company Info</h5>
                            <div className={classes['col-inner']}>
                                <a href="#">About us</a>
                                <a href="#">Carrier</a>
                                <a href="#">We are hiring</a>
                                <a href="#">Blog</a>
                            </div>
                        </div>
                        <div className={classes['footer-cols']}>
                        <h5>Legal</h5>
                            <div className={classes['col-inner']}>
                                <a href="#">About us</a>
                                <a href="#">Carrier</a>
                                <a href="#">We are hiring</a>
                                <a href="#">Blog</a>
                            </div>
                        </div>
                        <div className={classes['footer-cols']}>
                        <h5>Features</h5>
                            <div className={classes['col-inner']}>
                                <a href="#">Business Marketing</a>
                                <a href="#">User Analytic</a>
                                <a href="#">Live chat</a>
                                <a href="#">Unlimited Support</a>
                            </div>
                        </div>
                        <div className={classes['footer-cols']}>
                        <h5>Resources</h5>
                            <div className={classes['col-inner']}>
                                <a href="#">IOS & Android</a>
                                <a href="#">Watch a Demo</a>
                                <a href="#">Customers</a>
                                <a href="#">API</a>
                            </div>
                        </div>
                        <div className={classes['footer-cols']}>
                        <h5>Get in touch</h5>
                        <div className={classes['footer-input']}>
                            <input type="email" />
                            <button>Subscribe</button>
                            </div>
            
                        </div>
                    </div>
                </section>

                <section className={classes.TC}>
                    <h6>Made With Love By Finland All Right Reserved </h6>
                </section>
            </div>
        </footer>
    )
}

export default Footer
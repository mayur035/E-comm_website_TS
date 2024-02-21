import classes from './Dark-Nav.module.css'
import { Call, Email, Instagram, Facebook, Twitter, YouTube } from '@mui/icons-material';

const DarkNavbar = () => {
    return (
        <section id={classes['dark-header']}>
            <div className={classes.container}>
                <div className={classes.contact}>
                    <div className={classes.call}>
                        <Call /><span>(225) 555-0118</span>
                    </div>

                    <div className={classes.mail}>
                        <Email/><span>michelle.rivera@example.com</span>
                    </div>
                </div>

                <div className={classes.offer}>
                    Follow Us  and get a chance to win 80% off
                </div>
                
                <div className={classes.follow}>
                    <span>Follow us:</span>
                    <Facebook />
                    <Instagram />
                    <Twitter />
                    <YouTube />
                </div>
            </div>
        </section>
    )
}

export default DarkNavbar
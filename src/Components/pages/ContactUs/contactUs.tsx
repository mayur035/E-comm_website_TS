import React from 'react'
import classes from './contactUs.module.css'
import Button from '../../UI/Button/PrimaryButton'

const ContactUs = () => {
  return (
    <section className={classes['contact-us-main']}>
      <div className={classes['contact-us-inner-main']}>
        <div className={classes.left}>
          <h2>CONTACT US</h2>
          <p>Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics</p>
          <Button>Contact us</Button>
        </div>
        <div className={classes.right}>
          <div className={classes['right-one']}>
            <h3>Paris</h3>
            <h4>1901 Thorn ridge Cir.</h4>
            <hr />
            <h5>75000 Paris</h5>
            <h5>Phone ; +451 215 215 </h5>
            <h5>Fax : +451 215 215</h5>
          </div>
          <div className={classes['right-one']}>
            <h3>Paris</h3>
            <h4>1901 Thorn ridge Cir.</h4>
            <hr />
            <h5>75000 Paris</h5>
            <h5>Phone ; +451 215 215 </h5>
            <h5>Fax : +451 215 215</h5>
          </div>
          <div className={classes['right-one']}>
            <h3>Paris</h3>
            <h4>1901 Thorn ridge Cir.</h4>
            <hr />
            <h5>75000 Paris</h5>
            <h5>Phone ; +451 215 215 </h5>
            <h5>Fax : +451 215 215</h5>
          </div>
          <div className={classes['right-one']}>
            <h3>Paris</h3>
            <h4>1901 Thorn ridge Cir.</h4>
            <hr />
            <h5>75000 Paris</h5>
            <h5>Phone ; +451 215 215 </h5>
            <h5>Fax : +451 215 215</h5>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
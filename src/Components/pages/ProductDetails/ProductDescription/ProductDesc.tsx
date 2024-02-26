import { Assets } from '../../../../Assets/Assets'
import classes from './ProductDesc.module.css'
import React from 'react'

const ProductDesc = () => {
    return (
        <div className={classes['product-description-main']}>
            <div className={classes['product-desc-navbar']}>
                <ul>
                    <li><a href="#">Description</a></li>
                    <li><a href="#">Additional Information</a></li>
                    <li><a href="#">Review(0)</a></li>
                </ul>
            </div>
            <hr />
            <div className={classes['product-desc-content']}>
                <div className={classes['product-image']}>
                    <img className={classes.imageProduct} src={Assets.images.productDesc} alt="productDesc" />
                </div>
                <div className={classes['product-desc1']}>
                    <h3 className={classes.descHeading}>the quick fox jumps over</h3>
                    <article className={classes.descProduct}>
                        <p>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                        <p>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                        <p>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                    </article>
                </div>
                <div className={classes['product-desc2']}>
                    <h3 className={classes.descHeading}>the quick fox jumps over</h3>
                    <details>
                        <summary>the quick fox jumps over the lazy dog</summary>
                        <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </details>
                    <details>
                        <summary>the quick fox jumps over the lazy dog</summary>
                        <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </details>
                    <details>
                        <summary>the quick fox jumps over the lazy dog</summary>
                        <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </details>
                </div>
                <div className={classes['product-desc3']}>
                    <h3 className={classes.descHeading}>the quick fox jumps over</h3>
                    <details>
                        <summary>the quick fox jumps over the lazy dog</summary>
                        <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </details>
                    <details>
                        <summary>the quick fox jumps over the lazy dog</summary>
                        <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </details>
                    <details>
                        <summary>the quick fox jumps over the lazy dog</summary>
                        <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </details>
                </div>
            </div>
        </div>
    )
}

export default ProductDesc
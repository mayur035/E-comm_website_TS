import { useState } from 'react'
import { Assets } from '../../../../Assets/Assets'
import classes from './ProductDesc.module.css'
import { Link, Outlet } from 'react-router-dom'
import ProductDescContent from './ProductDescContent/ProductDescContent'
import ProductAddInfoContent from './ProductAddInfoContent/ProductAddInfoContent'
import ProductReviewContent from './ProductReviewContent/ProductReviewContent'

const ProductDesc = () => {
    const [selectedTab, setSelectedTab] = useState('reviews');

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

   
    return (
        <div className={classes['product-description-main']}>
            <div className={classes['product-desc-navbar']}>
                <ul>
                    <li><button className={classes['btns']} onClick={() => handleTabChange('description')}>Description</button></li>
                    <li><button className={classes['btns']} onClick={() => handleTabChange('additionalInfo')}>Additional Information</button></li>
                    <li><button className={classes['btns']} onClick={() => handleTabChange('reviews')}>Review(0)</button></li>
                </ul>

            </div>
            <hr />
            {selectedTab === 'description' && <ProductDescContent />}
            {selectedTab === 'additionalInfo' && <ProductAddInfoContent />}
            {selectedTab === 'reviews' && <ProductReviewContent />}
        </div>
    )
}

export default ProductDesc



import React, { useEffect, useState } from 'react'
import classes from './ProductList.module.css'
import ProductCard from '../../../UI/Card/ProductCard/Product-card'
import { FilterList } from '@mui/icons-material'
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider'
import { Link } from 'react-router-dom'
import RespFilter from '../ResponsiveFilter/RespFilter'
import { useFilterContext } from '../../../../Context/Filter_context'

const Checklist = ['All', 'Zara', 'Levi\'s', 'Adidas', 'Peter England', 'Allen solly', 'Fabindia']



const ProductList = () => {
    const context = useFilterContext();
    const [isShow, setIsShow] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };


    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    //getUnique for each fields
    const getUniqueData = (data: any, property: any) => {
        let newVal = data.map((curElement: string) => {
            return curElement[property];
        })
        newVal = ["all", ...new Set(newVal)];
        return newVal;
    }

    //getUnique data
    const categoryOnlyData = getUniqueData(context?.all_products, "productCategory");
    const PriceOnlyData = getUniqueData(context.all_products, "productOriginalPrice");
    const BrandOnlyData = getUniqueData(context.all_products, "productBrand");
    return (
        <div className={classes['product-list-main']}>
            <div className={classes['product-filter']}>
                <div className={classes['filter-by']}>
                    <h3>Filter by</h3>
                    {categoryOnlyData.map((curElement: string, index: any) => {
                        return (
                            <span key={index} data-name='productCategory' data-value={curElement} onClick={
                                context.updateFilterValue
                            }>
                                {curElement}
                            </span>
                        )
                    })}
                </div>
                <div className={classes['filter-price']}>
                    <h4>Price</h4>
                    <MultiRangeSlider
                        min={0}
                        max={1000}
                        onChange={({ min, max }) => { }}
                    />
                </div>
                <div className={classes['filter-brand']}>
                    <h4>Brands</h4>
                    <div>
                        <div className={classes.checkList}>
                            {BrandOnlyData.map((item:string, index:any) => {
                                return (
                                    <div key={index}>
                                        <input type="checkbox" id={item} data-name='productBrand' data-value={item} onClick={context.updateFilterValue}/>
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes['product-container']}>
                {(windowWidth <= 768) ?
                    <div className={classes['product-content']}>
                        {isShow && <RespFilter setIsShow={setIsShow} />}
                        <div className={classes.filter}><p onClick={() => setIsShow(!isShow)}>Filter<FilterList /></p></div>
                        <div className={classes.sort}>
                            <select name="sortBy" id="sortBy" onChange={context.sorting}>
                                <option value="high-low">Price(high-low)</option>
                                <option value="low-high">Price(low-high)</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="onReview">Avg. Customer Review</option>
                            </select>
                        </div>
                    </div>
                    :
                    <div className={classes['product-content']}>
                        <div className={classes['product-heading']}>
                            <h2>Men's clothing</h2>
                            <span>Seo text will be here</span>
                        </div>
                        <div className={classes.sorting}>
                            <h4>Sort By:</h4>
                            <select name="sortBy" id="sortBy" onChange={context.sorting}>
                                <option value="high-low">Price(high-low)</option>
                                <option value="low-high">Price(low-high)</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="onReview">Avg. Customer Review</option>
                            </select>
                        </div>
                    </div>}

                <div className={classes.product}>
                    {context.filter_products.map((product, index) => (
                        <Link key={index} style={{ textDecoration: 'none' }} to={`/productDetails/${product.id}`}>
                            <ProductCard key={index} {...product} ColorChoice={true} />
                        </Link>))}
                </div>
                <div className={classes['Pagination']}>
                    <span className={classes['next-prev']}>PREV</span>
                    <span className={classes.pageNo}>1</span>
                    <span className={classes.pageNo}>2</span>
                    <span className={classes.pageNo}>3</span>
                    <span className={classes['next-prev']}>NEXT</span>
                </div>
            </div>
        </div>
    )
}

export default ProductList
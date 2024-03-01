import React, { useEffect, useState } from 'react'
import classes from './ProductList.module.css'
import ProductCard from '../../../UI/Card/ProductCard/Product-card'
import ProductListing from '../../../../Data/Product-listing'
import { ChevronLeft, FilterList } from '@mui/icons-material'
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider'
import { Link } from 'react-router-dom'

const Checklist = ['All', 'Zara', 'Levi\'s', 'Adidas', 'Peter England', 'Allen solly', 'Fabindia']
const ProductList = () => {

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

    return (
        <div className={classes['product-list-main']}>
            <div className={classes['product-filter']}>
                <div className={classes['filter-by']}>
                    <h3>Filter by</h3>
                    <span style={{ display: 'flex', alignItems: 'center' }}><ChevronLeft />All Categories</span>
                    <span>All men's clothing</span>
                    <span>Women clothing</span>
                    <span>Footware</span>
                    <span>Watches</span>
                    <span>Beauty</span>
                    <span>Kid's clothing</span>
                    <span>Hand bags</span>
                    <span>Jwellery</span>
                </div>
                <div className={classes['filter-price']}>
                    <h4>Price</h4>
                    <MultiRangeSlider
                        min={0}
                        max={1000}
                        onChange={({ min, max }) => {}}
                    />
                </div>
                <div className={classes['filter-brand']}>
                    <h4>Brands</h4>
                    <div>
                        <div className={classes.checkList}>
                            {Checklist.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <input type="checkbox" id={item} name={item} value={item} />
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                )
                            })
                            }
                        </div>

                    </div>
                </div>
            </div>
            <div className={classes['product-container']}>
                {(windowWidth <= 768) ?
                    <div className={classes['product-content']}>
                        <div className={classes.filter}><p>Filter<FilterList/></p></div>
                        <div className={classes.sort}>
                            <select name="sortBy" id="sortBy">
                                <option value="Popularity">Popularity</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
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
                            <select name="sortBy" id="sortBy">
                                <option value="Popularity">Popularity</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>}

                <div className={classes.product}>
                    {ProductListing.map((product, index) => (
                        <Link key={product.id} style={{ textDecoration: 'none' }} to={`/productDetails/${product.id}`}>
                        <ProductCard key={index} {...product} ColorChoice={true}/>
                        </Link>     
                    ))}
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
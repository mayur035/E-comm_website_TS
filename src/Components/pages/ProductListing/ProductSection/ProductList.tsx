import { useEffect, useState } from 'react'
import classes from './ProductList.module.css'
import ProductCard from '../../../UI/Card/ProductCard/Product-card'
import { FilterList } from '@mui/icons-material'
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider'
import { Link } from 'react-router-dom'
import RespFilter from '../ResponsiveFilter/RespFilter'
import { useDispatch, useSelector } from 'react-redux'
import ProductListing from '../../../../Data/Product-listing'
import { filterAll, filterBrand, filterCategory, filterPrice, filterSelect } from '../../../../ReduxTool/Filters/FilterSlice'

const ProductList = () => {
    const [isShow, setIsShow] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const FilterData = useSelector((state: any) => state.ProductFilter.filterProducts)

    const dispatch = useDispatch();
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

    const minOriginalPrice = ProductListing.reduce((min, product) => Math.min(min, product.productOriginalPrice), Infinity);
    const maxOriginalPrice = ProductListing.reduce((max, product) => Math.max(max, product.productOriginalPrice), -Infinity);


    return (
        <div className={classes['product-list-main']}>
            <div className={classes['product-filter']}>
                <div className={classes['filter-by']}>
                    <h3>Filter by</h3>
                    {["All", ...new Set(ProductListing.map(product => product.productCategory))].map((category, index) => (
                        <span key={index} data-name='productCategory' data-value={category} onClick={() => {
                            dispatch(filterCategory(category))
                            dispatch(filterAll())
                        }}>
                            {category}
                        </span>
                    ))}

                </div>
                <div className={classes['filter-price']}>
                    <h4>Price</h4>
                    <MultiRangeSlider
                        min={minOriginalPrice}
                        max={maxOriginalPrice}
                        onChange={({ min, max }) => {
                            dispatch(filterPrice({ min, max }))
                        }}
                        onDispatchFilter={() => {
                            dispatch(filterAll())
                        }}
                    />
                </div>
                <div className={classes['filter-brand']}>
                    <h4>Brands</h4>
                    <div>
                        <div className={classes.checkList}>
                            {["All", ...new Set(ProductListing.map(product => product.productBrand))].map((brand, index) => {
                                return (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            data-name='productBrand'
                                            data-value={brand}
                                            onClick={() => {
                                                dispatch(filterBrand(brand))
                                                dispatch(filterAll())
                                            }}
                                        />
                                        {brand.toUpperCase()}
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
                            <select name="sortBy" id="sortBy" onChange={(event) => {
                                dispatch(filterSelect(event.target.value))
                                dispatch(filterAll())
                            }}>
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
                            <select name="sortBy" id="sortBy" onChange={(event) => {
                                dispatch(filterSelect(event.target.value))
                                dispatch(filterAll())
                            }}>
                                <option value="high-low">Price(high-low)</option>
                                <option value="low-high">Price(low-high)</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="onReview">Avg. Customer Review</option>
                            </select>
                        </div>
                    </div>}

                <div className={classes.product}>
                    {FilterData.map((product: any, index: any) => (
                        <Link key={index} style={{ textDecoration: 'none' }} to={`/productDetails/${product.id}`} >
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
        </div >
    )
}

export default ProductList
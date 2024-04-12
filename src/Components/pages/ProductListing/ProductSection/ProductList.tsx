import React, { useEffect, useState } from 'react'
import classes from './ProductList.module.css'
import ProductCard from '../../../UI/Card/ProductCard/Product-card'
import { FilterList, Minimize } from '@mui/icons-material'
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider'
import { Link } from 'react-router-dom'
import RespFilter from '../ResponsiveFilter/RespFilter'
import { useDispatch, useSelector } from 'react-redux'
import { fetch_filter_product, fetch_brands, fetch_categories, fetch_price, fetch_color } from '../../../../ReduxTool/Filters/FilterSlice'
import { Assets } from '../../../../Assets/Assets'
import Pagination from '../../../UI/Pagination/Pagination'


const ProductList: React.FC<any> = () => {
    const dispatch = useDispatch();
    const updateWindowWidth = () => { setWindowWidth(window.innerWidth); };

    const brands = useSelector((state: any) => state.ProductFilter.brands);
    const categories = useSelector((state: any) => state.ProductFilter.categories);
    const price = useSelector((state: any) => state.ProductFilter.price.data);
    const FilterData = useSelector((state: any) => state.ProductFilter.filterProducts)
    const filterBrands = useSelector((state: any) => state.ProductFilter.filterBrands)
    const page = useSelector((state: any) => state.ProductFilter.page)
    const [currentPage, setCurrentPage] = useState(page);

    const [isShow, setIsShow] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const [maxValues, setMaxValues] = useState(0);
    const [minValues, setMinValues] = useState(0);

    const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
    useEffect(() => {
        if (currentPage > visiblePages[visiblePages.length - 1]) {
            // If current page exceeds the visible range, update visiblePages
            setVisiblePages([currentPage - 1, currentPage, currentPage + 1]);
        } else if (currentPage < visiblePages[0]) {
            // If current page is before the visible range, update visiblePages
            setVisiblePages([currentPage - 1, currentPage, currentPage + 1]);
        }
    }, [currentPage]);

    useEffect(() => {
        dispatch(fetch_categories());
        dispatch(fetch_brands());
        dispatch(fetch_price());
        dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: currentPage } }))
        dispatch(fetch_filter_product({ filterType: 'select', filterValue: {selectValue:'low-high'} }))
    }, []);


    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        if (name === "All") {
            // If "All" is checked, uncheck all other checkboxes
            const otherCheckboxes = document.querySelectorAll('input[type="checkbox"]:not([name="All"])');
            otherCheckboxes.forEach((checkbox) => {
                (checkbox as HTMLInputElement).checked = false;
            });
        } else {
            // If any other checkbox is checked, uncheck "All" checkbox if it's checked
            const allCheckbox = document.querySelector('input[type="checkbox"][name="All"]') as HTMLInputElement;
            if (allCheckbox && allCheckbox.checked) {
                allCheckbox.checked = false;
            }
        }

        //     dispatch(fetch_filter_product({ filterType: 'brands', filterValue: {checked,nameSlug} }));
        // Dispatch action to update the filter
        const nameSlug = name === "All" ? "All" : brands.data.find((cat: any) => cat.name.toLowerCase() === name)?.slug;
        console.log(nameSlug);
        dispatch(fetch_filter_product({ filterType: 'brands', filterValue: { checked, nameSlug } }));
        dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: 1 } }));
    }

    return (
        <div className={classes['product-list-main']}>
            <div className={classes['product-filter']}>
                <div className={classes['filter-by']}>
                    <h3>Filter by</h3>
                    {["All", ...categories.data.map((category: any) => category.name)].map((categoryName, index) => (
                        <span
                            key={index}
                            data-name='productCategory'
                            data-value={categoryName === "All" ? null : categories.data.find((cat: any) => cat.name === categoryName)?.slug}
                            onClick={() => {
                                const slug = categoryName === "All" ? null : categories.data.find((cat: any) => cat.name === categoryName)?.slug;
                                dispatch(fetch_filter_product({ filterType: 'category', filterValue: slug }));
                                dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: 1 } }));
                            }}
                        >
                            {categoryName}
                        </span>
                    ))}
                </div>
                <div className={classes['filter-price']}>
                    <h4>Price</h4>
                    <MultiRangeSlider
                        min={price.minMRP}
                        max={price.maxMRP}
                        onChange={({ max, min }) => {
                            setMaxValues(max);
                            setMinValues(min);
                        }}
                        onDispatchFilter={() => {
                            dispatch(fetch_filter_product({ filterType: 'price', filterValue: { maxMRP: maxValues, minMRP: minValues } }))
                            dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: 1 } }));
                        }}
                    />
                </div>
                <div className={classes['filter-brand']}>
                    <h4>Brands</h4>
                    <div>
                        <div className={classes.checkList}>
                            {["All", ...new Set(brands.data.map((product: any) => product.name))].map((brand: any, index) => {
                                return (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            data-name='productBrand'
                                            data-value={brand === "All" ? 'All' : brands.data.find((cat: any) => cat.name === brand)?.slug}
                                            defaultChecked={
                                                filterBrands.length === 0 ? false : filterBrands.includes(brand.toLowerCase())
                                            }
                                            name={brand === "All" ? 'All' : brands.data.find((cat: any) => cat.name === brand)?.slug}
                                            onChange={handleCheckChange}
                                        />
                                        <label>
                                            {brand.toUpperCase()}
                                        </label>
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
                                const selectValue = event.target.value
                                dispatch(fetch_filter_product({ filterType: 'select', filterValue: { selectValue } }))
                            }}>
                                <option value="low-high">Price(low-high)</option>
                                <option value="high-low">Price(high-low)</option>
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
                                const selectValue = event.target.value
                                dispatch(fetch_filter_product({ filterType: 'select', filterValue: { selectValue } }))
                            }}>
                                <option value="low-high">Price(low-high)</option>
                                <option value="high-low">Price(high-low)</option>
                                <option value="newest">Newest Arrivals</option>
                                <option value="onReview">Avg. Customer Review</option>
                            </select>
                        </div>
                    </div>}

                {FilterData.data.product?.length === 0 ?
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', height: '100%', width: '100%' }}>
                        <h1>No Product Found</h1>
                        <img src={Assets.images.NoProductFound} height='50%' width='50%' alt="" />
                    </div>
                    :
                    <React.Fragment>
                        <div className={classes.product}>
                            {FilterData && FilterData.data.product && FilterData.data.product.map((product: any, index: any) => {  
                                if (product) {
                                    return (
                                        <Link key={index} style={{ textDecoration: 'none', margin: 'auto' }} to={`/productDetails?productID=${product.product.id}&productName=${product.product.name}&productCategory=${product.product.categories.name}&productColor=${product.product.productVariants[0].color}&productSize=${product.product.productVariants[0].size}`}>
                                            <ProductCard
                                                key={index}
                                                Image={{
                                                    src: product.product.productVariants[0].image_keys.product_url,
                                                    alt: product.product.productVariants[0].image_keys.description
                                                }}
                                                productName={product.product.name}
                                                productBrand={product.product.brands.name}
                                                productCategory={product.product.categories.name}
                                                productOriginalPrice={product.product.productVariants[0].mrp}
                                                productDiscountPrice={product.product.productVariants[0].discount || 0}
                                                colors={product.color}
                                            />
                                        </Link>
                                    );
                                }
                                else {
                                    return null; // If no default variant found, return null to skip rendering
                                }
                            })}
                        </div>

                    </React.Fragment>
                }
                <Pagination />
            </div>
        </div>
    )
}

export default ProductList
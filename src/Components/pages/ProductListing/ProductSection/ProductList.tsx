import React, { useEffect, useState } from 'react'
import classes from './ProductList.module.css'
import ProductCard from '../../../UI/Card/ProductCard/Product-card'
import { FilterList } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import RespFilter from '../ResponsiveFilter/RespFilter'
import { useDispatch, useSelector } from 'react-redux'
import { fetch_filter_product, fetch_brands, fetch_categories, fetch_price, fetch_color } from '../../../../ReduxTool/ProductFilterSlice'
import Pagination from '../../../UI/Pagination/Pagination'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { debounce } from 'lodash'
import { Assets } from '../../../../Assets/Assets'
import { AppDispatch, RootState } from '../../../../ReduxTool/State/Store'
import { brandsType, categoriesType, productType } from '../../../../types/types'

interface filterDataType {
    colors: [];
    product: productType
}

const ProductList: React.FC = () => {

    const [selectedCategory, setSelectedCategory] = useState<null | string | undefined>('All');

    const dispatch = useDispatch<AppDispatch>();
    const updateWindowWidth = () => { setWindowWidth(window.innerWidth); };

    const filterData = useSelector((state: RootState) => state.ProductFilter.filterProducts)
    const categories = useSelector((state: RootState) => state.ProductFilter.categories);
    const brands = useSelector((state: RootState) => state.ProductFilter.brands);
    const price = useSelector((state: RootState) => state.ProductFilter.price);
    const filterBrands = useSelector((state: RootState) => state.ProductFilter.filterBrands)
    const page = useSelector((state: RootState) => state.ProductFilter.page)
    // const [currentPage, setCurrentPage] = useState(page);


    const [isShow, setIsShow] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const [values, setValues] = useState([0, 0]);

    useEffect(() => {
        setValues([price.minMRP, price.maxMRP])
    }, [price.minMRP, price.maxMRP])

    const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
    useEffect(() => {
        if (page > visiblePages[visiblePages.length - 1]) {
            // If current page exceeds the visible range, update visiblePages
            setVisiblePages([page - 1, page, page + 1]);
        } else if (page < visiblePages[0]) {
            // If current page is before the visible range, update visiblePages
            setVisiblePages([page - 1, page, page + 1]);
        }
    }, [page]);

    useEffect(() => {
        dispatch(fetch_categories());
        dispatch(fetch_brands());
        dispatch(fetch_price());
        dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: page } }))
        dispatch(fetch_filter_product({ filterType: 'select', filterValue: { selectValue: 'low-high' } }))
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

        // Dispatch action to update the filter
        const nameSlug = name === "All" ? "All" : brands.find((cat: brandsType) => cat.name!.toLowerCase() === name)?.slug;
        dispatch(fetch_filter_product({ filterType: 'brands', filterValue: { checked, nameSlug } }));
        dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: 1 } }));
    }

    const debouncedFetchProducts = debounce((value) => {
        dispatch(fetch_filter_product({ filterType: 'price', filterValue: { maxMRP: value[1], minMRP: value[0] } }))
        dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: 1 } }))
    }, 2000);

    useEffect(() => {
        debouncedFetchProducts(values);
        return () => debouncedFetchProducts.cancel();
    }, [values]);

    return (
        <div className={classes['product-list-main']}>
            <div className={classes['product-filter']}>
                <div className={classes['filter-by']}>
                    <h3>Filter by</h3>
                    {["All", ...categories.map((category: categoriesType) => category.name)].map((categoryName, index) => (
                        <span
                            className={selectedCategory === categoryName ? `${classes.selected}` : ''}
                            key={index}
                            data-name='productCategory'
                            data-value={categoryName === "All" ? null : categories.find((cat: categoriesType) => cat.name === categoryName)?.slug}
                            onClick={async () => {
                                const slug = categoryName === "All" ? null : categories.find((cat: categoriesType) => cat.name === categoryName)?.slug;
                                await dispatch(fetch_filter_product({ filterType: 'category', filterValue: slug }));
                                dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: 1 } }));
                                setSelectedCategory(categoryName);
                            }}
                        >
                            {categoryName}
                        </span>
                    ))}
                </div>
                <div className={classes['filter-price']}>
                    <h4>Price</h4>
                    <RangeSlider
                        min={price.minMRP}
                        max={price.maxMRP}
                        value={values}
                        onInput={(val: number[]) => { setValues(val) }} />
                    <div className={classes['price-slider-container']}>
                        <span>{values[0]}</span>
                        <span>{values[1]}</span>
                    </div>
                </div>
                <div className={classes['filter-brand']}>
                    <h4>Brands</h4>
                    <div>
                        <div className={classes.checkList}>
                            {["All", ...new Set(brands.map((product: brandsType) => product.name))].map((brand: string | undefined, index) => {
                                return (
                                    <div key={index} className={classes['check-brand']}>
                                        <input
                                            id={index.toString()}
                                            type="checkbox"
                                            data-name='productBrand'
                                            data-value={brand === "All" ? 'All' : brands.find((cat: brandsType) => cat.name === brand)?.slug}
                                            defaultChecked={
                                                filterBrands.length === 0 ? false : filterBrands.includes(brand!.toLowerCase())
                                            }
                                            name={brand === "All" ? 'All' : brands.find((cat: brandsType) => cat.name === brand)?.slug}
                                            onChange={handleCheckChange}
                                        />
                                        <label style={{cursor:'pointer'}} htmlFor={index.toString()}>
                                            {brand!.toUpperCase()}
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

                {filterData && filterData.length === 0 ?
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', height: '100%', width: '100%' }}>
                        <h1>No Product Found</h1>
                        <img src={Assets.images.NoProductFound} height='50%' width='50%' alt="" />
                    </div>
                    :
                    <React.Fragment>
                        <div className={classes.product}>
                            {filterData && filterData.map((product: filterDataType, index: number) => {
                                if (product) {
                                    return (
                                        <Link key={index} style={{ textDecoration: 'none', margin: 'auto' }} to={`/productDetails?productID=${product?.product?.id}&productName=${product?.product?.name}&productCategory=${product?.product?.categories.name}&productColor=${product?.product?.productVariants?.color}&productSize=${product?.product?.productVariants?.size}`}>
                                            <ProductCard
                                                key={index}
                                                Image={{
                                                    src: product.product?.productVariants.image_keys.product_url!,
                                                    alt: 'this is product'
                                                }}
                                                productName={product?.product?.name!}
                                                productBrand={product?.product?.brands.name!}
                                                productCategory={product?.product?.categories.name!}
                                                productOriginalPrice={product?.product?.productVariants.mrp!}
                                                productDiscountPrice={product?.product?.productVariants.discount || 0}
                                                colors={product?.colors!}
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
import React, { useEffect } from 'react';
import classes from './RespFilter.module.css';
import ReactDom from 'react-dom';
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider';
import Drawer from './Drawer/Drawer';
import Accordion from './Accordion/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import ProductListing from '../../../../Data/Product-listing';
import { fetch_filter_product } from '../../../../ReduxTool/Filters/FilterSlice'

const BackDrop: React.FC = () => {
    return (
        <div className={classes['backDrop']} />
    );
};

const ModalOverlays: React.FC<{ setIsShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsShow }) => {

    const dispatch = useDispatch();
    
    const brands = useSelector((state: any) => state.ProductData.brands);
    const categories = useSelector((state: any) => state.ProductData.categories);

    const filterBrands = useSelector((state: any) => state.ProductFilter.filterBrands)


    // const minOriginalPrice = ProductListing.reduce((min, product) => Math.min(min, product.productOriginalPrice), Infinity);
    // const maxOriginalPrice = ProductListing.reduce((max, product) => Math.max(max, product.productOriginalPrice), -Infinity);

    return (
        <div className={classes['modal-overlays']}>
            <div className={classes['filter-menu']}>

                <Accordion accordion_head="Categories">
                    {["All", ...categories.data.map((category: any) => category.name)].map((categoryName, index) => (
                        <span
                        key={index}
                        data-name='productCategory'
                        data-value={categoryName === "All" ? null : categories.data.find((cat: any) => cat.name === categoryName)?.slug}
                            onClick={() => {
                                const slug = categoryName === "All" ? null : categories.data.find((cat: any) => cat.name === categoryName)?.slug;
                                dispatch(fetch_filter_product({ filterType: 'category', filterValue: slug }));
                                setIsShow(false)
                            }}>
                            {categoryName}
                        </span>
                    ))}
                </Accordion>

                <Accordion accordion_head="Price">
                    <MultiRangeSlider
                        min={0}
                        max={100}
                        onChange={({ min, max }) => {
                            // dispatch(filterPrice({ min, max }))
                        }}
                        onDispatchFilter={() => {
                            // dispatch(filterAll())
                        }}
                    />
                </Accordion>
                <Accordion accordion_head="Brands">
                    <div>
                        {["All", ...new Set(brands.data.map((product: any) => product.name))].map((brand:any, index) => {
                            return (
                                <div key={index}>
                                    <input
                                            type="checkbox"
                                            data-name='productBrand'
                                            data-value={brand === "All" ? 'All' : brands.data.find((cat: any) => cat.name === brand)?.slug}
                                            defaultChecked={filterBrands.includes(brand.toLowerCase())}
                                            onClick={async () => {
                                                const slug = brand === "All" ? 'All' : await brands.data.find((cat: any) => cat.name === brand)?.slug;
                                                dispatch(fetch_filter_product({ filterType: 'brands', filterValue: slug }));
                                            }}
                                        />
                                    {brand.toUpperCase()}
                                </div>
                            )
                        })}
                    </div>
                </Accordion>
            </div>
        </div>
    );
};

const RespFilter: React.FC<{ setIsShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsShow }) => {
    useEffect(() => {
        // Add event listener to handle body overflow when component mounts
        document.body.style.overflow = 'hidden';
        // Remove event listener when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, []);


    return (
        <React.Fragment>
            {ReactDom.createPortal(<BackDrop />, document.getElementById('backdrop-root')!)}
            {ReactDom.createPortal(
                <Drawer setIsShow={setIsShow}>
                    <ModalOverlays setIsShow={setIsShow} />
                </Drawer>, document.getElementById('overlays-root')!)}
        </React.Fragment>
    );
};

export default RespFilter;

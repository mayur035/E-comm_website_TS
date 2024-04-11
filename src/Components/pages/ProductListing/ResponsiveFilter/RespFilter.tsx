import React, { useEffect, useState } from 'react';
import classes from './RespFilter.module.css';
import ReactDom from 'react-dom';
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider';
import Drawer from './Drawer/Drawer';
import Accordion from './Accordion/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_filter_product, fetch_brands, fetch_categories, fetch_price } from '../../../../ReduxTool/Filters/FilterSlice'


const BackDrop: React.FC = () => {
    return (
        <div className={classes['backDrop']} />
    );
};

const ModalOverlays: React.FC<{ setIsShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsShow }) => {
    const [maxValues, setMaxValues] = useState(0);
    const [minValues, setMinValues] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetch_categories());
        dispatch(fetch_brands());
        dispatch(fetch_price());
    }, []);

    const brands = useSelector((state: any) => state.ProductFilter.brands);;
    const categories = useSelector((state: any) => state.ProductFilter.categories);
    const price = useSelector((state: any) => state.ProductFilter.price.data);
    const filterBrands = useSelector((state: any) => state.ProductFilter.filterBrands)

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
        const nameSlug = name === "All" ? "All" : brands.data.find((cat: any) => cat.name.toLowerCase() === name)?.slug;
        console.log(nameSlug);
        dispatch(fetch_filter_product({ filterType: 'brands', filterValue: { checked, nameSlug } }));
        dispatch(fetch_filter_product({ filterType: 'pagination', filterValue: { page: 1 } }));
    }

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
                            }}
                            style={{cursor:'pointer'}}>
                            {categoryName}
                        </span>
                    ))}
                </Accordion>

                <Accordion accordion_head="Price">
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
                </Accordion>


                <Accordion accordion_head="Brands">
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

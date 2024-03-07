import React, { useEffect } from 'react';
import classes from './RespFilter.module.css';
import ReactDom from 'react-dom';
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider';
import Drawer from './Drawer/Drawer';
import Accordion from './Accordion/Accordion';
import { useDispatch } from 'react-redux';
import ProductListing from '../../../../Data/Product-listing';
import { filterAll, filterBrand, filterCategory, filterPrice } from '../../../../ReduxTool/Filters/FilterSlice';

const BackDrop: React.FC = () => {
    return (
        <div className={classes['backDrop']} />
    );
};

const ModalOverlays: React.FC<{ setIsShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsShow }) => {

    const dispatch = useDispatch();

    const minOriginalPrice = ProductListing.reduce((min, product) => Math.min(min, product.productOriginalPrice), Infinity);
    const maxOriginalPrice = ProductListing.reduce((max, product) => Math.max(max, product.productOriginalPrice), -Infinity);

    return (
        <div className={classes['modal-overlays']}>
            <div className={classes['filter-menu']}>

                <Accordion accordion_head="Categories">
                {["All", ...new Set(ProductListing.map(product => product.productCategory))].map((category, index) => (
                        <span key={index} data-name='productCategory' data-value={category} onClick={() => {
                            dispatch(filterCategory(category))
                            dispatch(filterAll())
                            setIsShow(false)
                        }}>
                            {category}
                        </span>
                    ))}
                </Accordion>

                <Accordion accordion_head="Price">
                <MultiRangeSlider
                        min={minOriginalPrice}
                        max={maxOriginalPrice}
                        onChange={({ min, max }) => {
                            dispatch(filterPrice({ min, max }))
                        }}
                        onDispatchFilter={()=>{
                            dispatch(filterAll())
                        }}
                    />
                </Accordion>
                <Accordion accordion_head="Brands">
                    <div>
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

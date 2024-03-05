import React, { useEffect, useState } from 'react';
import classes from './RespFilter.module.css';
import ReactDom from 'react-dom';
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider';
import Drawer from './Drawer/Drawer';
import Accordion from './Accordion/Accordion';
import { useFilterContext } from '../../../../Context/Filter_context';

const Checklist = ['All', 'Zara', 'Levi\'s', 'Adidas', 'Peter England', 'Allen solly', 'Fabindia'];

const BackDrop: React.FC = () => {
    return (
        <div className={classes['backDrop']} />
    );
};

const ModalOverlays: React.FC<{ setIsShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsShow }) => {
    const context = useFilterContext();

    const handleClick = (event: any) => {
        if (context.updateFilterValue) {
            context.updateFilterValue(event)

        }
        setIsShow(false)
    }

    //getUnique for each fields
    const getUniqueData = (data: any, property: any) => {
        let newVal = data.map((curElement: string) => {
            return curElement[property];
        })
        newVal = ["All Categories", ...new Set(newVal)];
        return newVal;
    }

    //getUnique data
    const categoryOnlyData = getUniqueData(context.all_products, "productCategory");
    const PriceOnlyData = getUniqueData(context.all_products, "productOriginalPrice");
    const BrandOnlyData = getUniqueData(context.all_products, "productBrand");
    return (
        <div className={classes['modal-overlays']}>
            <div className={classes['filter-menu']}>

                <Accordion accordion_head="Categories">
                    {categoryOnlyData.map((curElement: string, index: any) => {
                        return (
                            <span
                                key={index}
                                data-name='productCategory'
                                data-value={curElement}
                                onClick={handleClick}
                            >
                                {curElement}
                            </span>

                        )
                    })}
                </Accordion>

                <Accordion accordion_head="Price">
                    <MultiRangeSlider
                        min={0}
                        max={1000}
                        onChange={({ min, max }) => {}}
                    />
                </Accordion>
                <Accordion accordion_head="Brands">
                    <div>
                        {BrandOnlyData.map((item:string, index:any) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" id={item} data-name='productBrand' data-value={item} />
                                    <label htmlFor={item}>{item}</label>
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

import React, { useEffect, useState } from 'react';
import classes from './RespFilter.module.css';
import ReactDom from 'react-dom';
import { Close, KeyboardArrowDown } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import MultiRangeSlider from '../../../UI/multiRangeSlider/MultiRangeSlider';
import Drawer from './Drawer/Drawer';
import Accordion from './Accordion/Accordion';

const Checklist = ['All', 'Zara', 'Levi\'s', 'Adidas', 'Peter England', 'Allen solly', 'Fabindia'];

const BackDrop: React.FC = () => {
    return (
        <div className={classes['backDrop']} />
    );
};

const ModalOverlays: React.FC = () => {
    const [showCategories, setShowCategories] = useState<boolean>(false);
    const [showPrice, setShowPrice] = useState<boolean>(false);
    const [showBrands, setShowBrands] = useState<boolean>(false);

    return (
        <div className={classes['modal-overlays']}>
            <div className={classes['filter-menu']}>

                <Accordion accordion_head="Categories">
                    <ul style={{listStyle:'none',gap:'9px',display:'flex',flexDirection:'column',}}>
                        <li>All men's clothing</li>
                        <li>Women clothing</li>
                        <li>Footwear</li>
                        <li>Watches</li>
                        <li>Beauty</li>
                        <li>Kid's clothing</li>
                        <li>Hand bags</li>
                        <li>Jewelry</li>
                    </ul>
                </Accordion>

                <Accordion accordion_head="Price">
                    <MultiRangeSlider
                        min={0}
                        max={1000}
                        onChange={({ min, max }) => { }}
                    />
                </Accordion>
                <Accordion accordion_head="Brands">
                    <div>
                        {Checklist.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" id={item} name={item} value={item} />
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
const accordion_head = 'head'
// const accordion_content = 'content asdsdasdadasdasdasdasdadsad'



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
                    <ModalOverlays />
                </Drawer>, document.getElementById('overlays-root')!)}
        </React.Fragment>
    );
};

export default RespFilter;

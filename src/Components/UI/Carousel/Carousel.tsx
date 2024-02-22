import { useState } from 'react';
import classes from './Carousel.module.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

type CarouselContentProps = {
    contentCarousel: { 
        src: string; 
        alt: string;
        content:{
            heading5:string;
            heading1:string;
            heading4:string;
        }
    }[];
}

const Carousel = (props:CarouselContentProps) => {
    const [slide, setSlide] = useState(0)

    const next_Slide = () => {
        setSlide(slide === props.contentCarousel.length - 1 ? 0 : slide + 1);
    };

    const prev_Slide = () => {
        setSlide(slide === 0 ? props.contentCarousel.length - 1 : slide - 1);
    };

    return (
        <div className={classes.carousel}>
            <ChevronLeft className={`${classes.arrow} ${classes["left-chevron"]}`} onClick={prev_Slide} />
            {props.contentCarousel.map((item, index) => (
                <div key={index} className={`${classes.slide} ${slide === index ? '' : classes['slide-hidden']}`}>
                    <div className={classes["carousel-control"]}>
                        <div className={classes["carousel-content-inner"]} >
                            <h5>{item.content.heading5}</h5>
                            <h1>{item.content.heading1}</h1>
                            <h4>{item.content.heading4}</h4>
                        </div>
                    </div>
                    <img src={item.src} alt={item.alt} className={classes.slide} />
                </div>
            ))}
            <ChevronRight className={`${classes.arrow} ${classes["right-chevron"]}`} onClick={next_Slide} />
        </div>
    )
}

export default Carousel;

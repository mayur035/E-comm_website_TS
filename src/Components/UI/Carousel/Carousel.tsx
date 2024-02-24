import { useState } from 'react';
import classes from './Carousel.module.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Slides from './Slides';

type CarouselData={
        carouselData: {
            slides: {
                src: string;
                alt: string;
                content: {
                    heading5: string;
                    heading1: string;
                    heading4: string;
                };
            }[];
        };
    };
const Carousel = (props:CarouselData) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const nextSlide = () => {
        const totalSlides = props.carouselData.slides.length;
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        const totalSlides = props.carouselData.slides.length;
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);         
    };
    
             

    return (
        <div className={classes['carousel-container']}>
            <ChevronLeft className={`${classes.arrow} ${classes["left-chevron"]}`}  onClick={prevSlide}/>
            <ChevronRight className={`${classes.arrow} ${classes["right-chevron"]}`}  onClick={nextSlide} />
            <div className={classes.slides}>
                <Slides contentCarousel={props.carouselData.slides[currentSlide]} currentSlide={currentSlide}/>
            </div>
        </div>
    )
}

export default Carousel;

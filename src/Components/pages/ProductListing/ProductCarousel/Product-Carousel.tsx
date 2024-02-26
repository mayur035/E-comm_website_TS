import React, { useState } from 'react';
import classes from './Product-Carousel.module.css';
import { Assets } from '../../../../Assets/Assets';
import useBreakpoints from '../../../../customHooks/Breakpoints/useBreakPoints';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ProductSlide from './Product-Slide';

const data = [
    { src: Assets.images.product_list_c1, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c2, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c3, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c4, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c5, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c1, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c2, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c3, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c4, title: "MEN'S CLOTHING", items_quantity: 5 },
    { src: Assets.images.product_list_c5, title: "MEN'S CLOTHING", items_quantity: 5 },
];

const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const breakpoint = useBreakpoints();
    const SlideLeft = () => {
      if (breakpoint === "md" || breakpoint === "lg") {
        if (currentIndex === data.length - 5) {
          return setCurrentIndex(0);
        }
        return setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      if (breakpoint === "xl") {
        if (currentIndex === data.length - 6) {
          return setCurrentIndex(0);
        }
        return setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      if (breakpoint === "xs") {
        if (currentIndex === data.length - 1) {
          return setCurrentIndex(0);
        }
        return setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      if (breakpoint === "sm") {
        if (currentIndex === data.length - 2) {
          return setCurrentIndex(0);
        }
        return setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    };
    const SlideRight = () => {
      if (currentIndex === 0) {
        return setCurrentIndex(data.length - 5);
      }
      return setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    return (
      <React.Fragment>
        <div className={classes.carousel}>
            <ChevronLeft onClick={SlideRight}/>
          <div className={classes.container}>
            {data.map((card,index) => (
              <div
              key={index}
                style={{
                  transform: `translate(${-currentIndex * 100}%)`,
                  transition: "all 1s linear",
                }}
              >
                <ProductSlide src={card.src} title={card.title} items={card.items_quantity} />
              </div>
            
            ))}
          </div>
           <ChevronRight onClick={SlideLeft}/>
        </div>
      </React.Fragment>
    );
};

export default ProductCarousel;

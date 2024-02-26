import React, { Fragment } from "react";
import styles from "./Product-Slide.module.css"

type ProductSlideProps= {
  src: string;
  title: string;
  items: number;
}

const ProductSlide = (props: ProductSlideProps) => {
  return (
    <Fragment>
      <div className={styles.card}>
        <img src={props.src} alt="" />
        <div className={styles.description}>
          <h6>{props.title}</h6>
          <h6>{props.items} items</h6>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductSlide;

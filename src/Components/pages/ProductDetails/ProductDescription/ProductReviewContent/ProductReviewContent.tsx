import React, { useEffect, useState } from 'react'
import classes from './ProductReviewContent.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../../ReduxTool/State/Store';
import { Colordot } from '../../../../UI/colorSize/color_Size';
import { Rating } from '@mui/material';
import { getReviews, postReviews } from '../../../../../ReduxTool/reviewsSlice';
import { reviewType } from '../../../../../types/types';
import { AccountCircle } from '@mui/icons-material';

const ProductReviewContent = () => {
  const [value, setValue] = useState<number>(0);
  const [review, setReview] = useState('');
  const [showInputReview, setShowInputReview] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  const product_reviews = useSelector((state: RootState) => state.reviewsSlice.reviews)
  const product_Detail = useSelector((state: RootState) => state.productDetailsSlice.productDetails)

  const product = product_Detail?.ProductDetails!;
  const productVariantId = product?.productVariants?.id

  useEffect(() => {
    if (product_Detail?.ProductDetails?.productVariants?.id) {
      const product_variant_id = product_Detail.ProductDetails.productVariants.id;
      dispatch(getReviews(product_variant_id));
    }
  }, [product_Detail])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productVariantId === undefined) {
      console.error("Product variant ID is undefined.");
      return;
    }
    await dispatch(postReviews({ productVariantId: productVariantId, stars: value, comment: review }));
    await dispatch(getReviews(productVariantId!))
    setValue(0);
    setReview('');
    setShowInputReview(false)
  };


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReview(value);
  };

  return (
    <div className={classes['product-reviews-content']}>
      <h1>Create Review</h1>
      <hr />
      <div className={classes['product-details-main']}>
        <div className={classes['product-details-image']}>
          <img className={classes['product-image']} style={{ borderRadius: '50%' }} src={product?.productVariants?.image_keys.product_url} alt='product image' />
        </div>
        <div className={classes['product-detail']}>
          <div className={classes['product-name']}>{product?.name}</div>
          <div className={classes['product-size']}>Size:<p>{product?.productVariants?.size}</p></div>
          <div className={classes['product-color']}>Color:<Colordot color={product?.productVariants.color!} /></div>
        </div>
      </div>
      <hr />
      <div className={classes['add-review-btn']}>
        <button onClick={()=>setShowInputReview(!showInputReview)}>Add Reviews</button>
      </div>
      {showInputReview &&
        <div className={classes['product-review-input']}>
          <div className={classes['product-star-rating']}>
            <h3>Overall rating</h3>
            <Rating
              name="half-rating"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue || 0);
              }}
              size="large" />
          </div>
          <hr />
          <form onSubmit={handleSubmit} className={classes['product-comment-rating']}>
            <h3>Add a written review</h3>
            <textarea name="" id="" rows={10} placeholder='What did you like or dislike?What did you use this product for?'
              value={review} onChange={handleChange}></textarea>
            <hr />
            <div className={classes['submit-btn']}>
              <button type='submit'>Submit</button>
            </div>
          </form>
          <hr />
        </div>
      }
      {product_reviews.length === 0 ?
        <p>No Review</p>
        :
        <div className={classes['product-review-list']}>
          {
            product_reviews.map((review: reviewType) => {
              return (
                <div key={review.id} className={classes['reviews']}>
                  <div className={classes['profile-review']}><AccountCircle /><p>{review.users.firstname === null ? "User" : review.users.firstname} {review.users.lastname}</p></div>
                  <div className={classes['review']}>
                    <Rating
                      name="half-rating"
                      value={review.stars}
                      precision={0.5}
                      readOnly
                      size="small" />
                    <p>{review.text}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default ProductReviewContent
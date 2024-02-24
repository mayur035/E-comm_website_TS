import classes from './featured-section-card.module.css'
import FeaturedCard from '../../../UI/Card/FeaturedPostsCard/Featured-card'
import { FeatureData } from '../../../../Data/features-data'

const FeaturedSection = () => {
  return (
    <div className={classes['featured-section-main']}>
      <div className={classes['feature-container']}>
        <div className={classes['feature-container-head']}>
          <h6>Practice Advice</h6>
          <h3>Featured Posts</h3>
          <p>Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics </p>
        </div>
        <div className={classes.cardSection}>
          {
            FeatureData.map((data, index) => {
              return (
                <FeaturedCard
                  key={index}
                  img={data.img}
                  content={data.content}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default FeaturedSection
import classes from './Featured-card.module.css'
import { AccessAlarm, ChevronRight, ShowChart } from '@mui/icons-material'

type FeaturedCardProps={
  img:{
    src:string;
    alt:string;
  },
  content:{
    heading:string;
    desc:string;
    time:string;
    comment:number;
  }
};
const FeaturedCard = (props:FeaturedCardProps) => {
  return (
    <div className={classes['feature-card-main']}>
      <div className={classes['feature-card-image']}>
        <img src={props.img.src} alt={props.img.alt} />
        <div className={classes.new}>New</div>
      </div>

      <div className={classes['feature-card-content']}>
        <div className={classes.options}>
          <span>Google</span>
          <span>Trending</span>
          <span>New</span>
        </div>

        <div className={classes['card-details']}>
          <h4>{props.content.heading}</h4>
          <p className={classes.paragraph}>{props.content.desc}</p>
          <div className={classes['time-comments']}>
            <span><AccessAlarm htmlColor='#23A6F0'/><p>{props.content.time}</p></span>
            <span><ShowChart/><p>{props.content.comment} comments</p></span>
          </div>
            <h6 className={classes.more}><p>Learn more</p><ChevronRight/></h6>
        </div>
      </div>

    </div>
  )
}

export default FeaturedCard
import Button from '../Button/PrimaryButton';
import classes from './Slides.module.css'

type SlidesProps = {
    contentCarousel: {
      src: string;
      alt: string;
      content: {
        heading5: string;
        heading1: string;
        heading4: string;
      }
    };
    currentSlide: number;
  }
  
  const Slides = (props:SlidesProps) => {
      return (
          <div className={classes['slide-container']}>
                <div className={classes.slide} >
                    <img src={props.contentCarousel.src} alt={props.contentCarousel.alt} className={classes.Slideimage}/>
                    <div className={classes.content}>
                        <h5>{props.contentCarousel.content.heading5}</h5>
                        <h1>{props.contentCarousel.content.heading1}</h1>
                        <h4>{props.contentCarousel.content.heading4}</h4>
                    
                        <Button>shop me</Button>
                      
                    </div>
                </div>
        </div>
    )
}

export default Slides
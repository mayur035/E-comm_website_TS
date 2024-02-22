import classes from './card-pics.module.css' 
type EditorcardProps={
  src:string;
  alt:string;
  label:string
}
const CardPics = (props:EditorcardProps) => {
  return (
    <div className={classes.card}>
        <img src={props.src} alt={props.alt}/>
        <h5 className={classes.label}>{props.label}</h5>
    </div>
  )
}

export default CardPics
import classes from './PrimaryButton.module.css'

type buttonProps = {
  text: string;
  isPrimary: boolean;
}
const Button = (props: buttonProps) => {
  return (
    <button className={`${props.isPrimary ? classes['primary-btn'] : classes['secondary-btn']}`}>
      <h3>{props.text}</h3> </button>
  )
}

export default Button
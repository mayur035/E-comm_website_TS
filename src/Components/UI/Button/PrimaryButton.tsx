import React, { ReactNode } from 'react';
import classes from './PrimaryButton.module.css'

type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  buttonType?: 'primary' | 'secondary';
};
const CustomButton: React.FC<buttonProps> = ({children,buttonType='primary',...props}) => {
  const buttonClassName = buttonType === 'primary' ? classes.primaryBtn : classes.secondaryBtn;
  return (
    <button {...props} className={`${classes.btn} ${buttonClassName}`}>
      <h3 className={classes.head3}>{children}</h3>
    </button>
  )
}

export default CustomButton;
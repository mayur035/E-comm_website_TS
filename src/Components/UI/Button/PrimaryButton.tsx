import React, { ReactNode } from 'react';
import classes from './PrimaryButton.module.css'

type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  buttonType?: 'solid' | 'outline';
  buttonColor?: 'green' | 'blue';
};
const CustomButton: React.FC<buttonProps> = ({ children, buttonColor = 'green', buttonType = 'solid', ...props }) => {

  const buttonClassName = buttonColor === 'green' ? (buttonType === 'solid' ? classes.solidGreenBtn : classes.outlineGreenBtn) : (buttonType === 'solid' ? classes.solidBlueBtn : classes.outlineBlueBtn);

  /* const buttonClassName =
  const btnClass = buttonType === 'solid' ? (buttonColor === 'green' ? classes.solidGreenBtn : classes.solidBlueBtn) : (buttonColor === 'green' ? classes.outlineGreenBtn : classes.outlineBlueBtn);
  */
  return (
    <button {...props} className={`${classes.btn} ${buttonClassName}`}>
      <h3 className={classes.head3}>{children}</h3>
    </button>
  )
}

export default CustomButton;
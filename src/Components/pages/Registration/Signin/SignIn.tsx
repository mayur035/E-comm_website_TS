import { ChangeEvent, useState } from 'react'
import classes from './SignIn.module.css'
import { Facebook, Google, LinkedIn } from '@mui/icons-material';
import { ToastFunc } from '../../../../utils/ToastFun';

const SignIn = () => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if email is valid
    if (!emailRegex.test(state.email)) {
      ToastFunc("Email is not valid", "warn")
      return;
    }

    // Check if password matches the regex
    if (!passwordRegex.test(state.password)) {
      ToastFunc("Password is not valid", "warn")
      return;
    }
  };
  const isDisabled = state.email.trim() === '' || state.password.trim() === '';

  return (
    <div className={classes['signup-main-container']}>
      <form onSubmit={handleSubmit} className={classes.from_control}>
        <h1 className={classes.heading}>Sign In</h1>
        <div className={classes['social-container']}>
          <a href=""><Facebook className={classes.social} /></a>
          <a href=""><Google className={classes.social} /></a>
          <a href=""><LinkedIn className={classes.social} /></a>
        </div>
        <span>or use your account</span>
        <div className={classes['form-input-container']}>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button disabled={isDisabled}>Log in</button>
        </div>
      </form>


    </div>
  )
}

export default SignIn

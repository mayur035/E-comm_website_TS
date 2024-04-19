import React, { useState, useEffect } from 'react';
import classes from './login.module.css';
import { Assets } from '../../../Assets/Assets';
import Button from '../../../Components/UI/Button/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import { ToastFunc } from '../../../utils/ToastFun';
import { setIsAuthenticated } from '../../../ReduxTool/AuthDataSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

interface UserData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: ''
  });
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userData.email.trim() === '' || userData.password.trim() === '') {
      ToastFunc("Enter mail or password", "error")
      return;
    }
    // Check if email is valid
    if (!emailRegex.test(userData.email)) {
      ToastFunc("Email is not valid", "warn")
      return;
    }


    const userDatas: UserData = {
      email: userData.email,
      password: userData.password,
    }

    try {
      const response = await axios.post(`http://localhost:3001/register/login`, userData)
     
      if (response.status === 200) {
        ToastFunc(response.data.message, 'success')
        dispatch(setIsAuthenticated({ userData: userDatas, token: response.data.token }))
        navigate('/')
        return;
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        ToastFunc(error.response.data, 'warn')
      } else if (error.response.status === 500) {
        ToastFunc(error.response.data, 'warn')
      } else if (error.response.status === 401) {
        ToastFunc(error.response.data, 'warn')
      } else {
        ToastFunc(error.message, 'error')
      }
    }
  };

  // Update form validity state whenever userData changes
  useEffect(() => {
    const isFormValid = userData.email.trim() !== '' && userData.password.trim() !== '';
    setFormValid(isFormValid);
  }, [userData]);

  return (
    <div className={classes['login-main']}>
      <div className={classes['assests-login']}>
        <img src={Assets.images.Login} alt='login' />
      </div>
      <div className={classes['form-control']}>
        <form onSubmit={handleSubmit} method='POST' action='#' className={classes.form}>
          <div className={classes['input-control']}>
            <label htmlFor='email'>Email:</label><br />
            <input type='email' id='email' name='email' value={userData.email} onChange={handleChange} /><br />
          </div>
          <div className={classes['input-control']}>
            <label htmlFor='password'>Password:</label><br />
            <input type='password' id='password' name='password' value={userData.password} onChange={handleChange} /><br />
          </div>
          <br /><br />

          <Button style={{ padding: '5% 15%' }} type='submit'>Login</Button><br /><br />
          <span>Don't have an account? <Link to='/signup' className={classes.link}>Click here</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;

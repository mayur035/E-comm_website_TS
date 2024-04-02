import React, { useState } from 'react';
import classes from './signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Assets } from '../../../Assets/Assets';
import Button from '../../../Components/UI/Button/PrimaryButton';
import { ToastFunc } from '../../../utils/ToastFun';
import axios from 'axios';

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repassword: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repassword: ''
  });
  const [formValid, setFormValid] = useState(false);

  const { repassword, ...datawithoutRePassword } = userData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(userData.password)) {
      ToastFunc("Password should contain at least one uppercase letter, one digit, one special character, and be at least 8 characters long.", "error");
      return;
    }

    if (userData.password.trim() !== userData.repassword.trim()) {
      ToastFunc("Both password is not match", 'error')
      return;
    }
    if (
      userData.email.trim() === '' ||
      userData.password.trim() === '' ||
      userData.repassword.trim() === ''
    ) {
      ToastFunc("Please fill all fields", 'error')
      return;
    }


    try {
      const response = await axios.post(`http://localhost:3001/register`, datawithoutRePassword);

      console.log(response.status);
      
      if (response.status === 200) {
        ToastFunc(response.data.message, 'success')
        navigate('/login')
        return;
      }
    } catch (error:any) {
      if (error.response.status === 409) {
        ToastFunc(error.response.data.error, 'warn')
      } else if (error.response.status === 500) {
        ToastFunc(error.response.data.error, 'warn')
      } else {
        ToastFunc(error.message, 'error')
      }
    }

  };

  return (
    <div className={classes['signup-main']}>
      <div className={classes['assests-signup']}>
        <img src={Assets.images.Signup} alt='signup' />
      </div>
      <div className={classes['form-control']}>
        <form onSubmit={handleSubmit} method='POST' action='#' className={classes.form}>
          <div className={classes['input-control']}>
            <label htmlFor="fname">First name:</label><br />
            <input type="text" id="fname" name="firstname" value={userData.firstname} onChange={handleChange} /><br />
          </div>
          <div className={classes['input-control']}>
            <label htmlFor="lname">Last name:</label><br />
            <input type="text" id="lname" name="lastname" value={userData.lastname} onChange={handleChange} /><br />
          </div>
          <div className={classes['input-control']}>
            <label htmlFor="lname">Email<sup style={{ color: 'red' }}>*</sup>:</label><br />
            <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} /><br />
          </div>
          <div className={classes['input-control']}>
            <label htmlFor="lname">Password<sup style={{ color: 'red' }}>*</sup>:</label><br />
            <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} /><br />
          </div>
          <div className={classes['input-control']}>
            <label htmlFor="lname">Re-password<sup style={{ color: 'red' }}>*</sup>:</label><br />
            <input type="password" id="repassword" name="repassword" value={userData.repassword} onChange={handleChange} />
          </div>
          <br /><br />

          <Button style={{ padding: '5% 15%' }} type='submit'>Signup</Button><br /><br />

          <span>Already have an account? <Link to='/login' className={classes.link}>Click here</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;

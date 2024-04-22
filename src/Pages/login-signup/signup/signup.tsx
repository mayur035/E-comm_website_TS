import React, { useState } from 'react';
import classes from './signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Assets } from '../../../Assets/Assets';
import Button from '../../../Components/UI/Button/PrimaryButton';
import { ToastFunc } from '../../../utils/ToastFun';
import axios from 'axios';
import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup'

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repassword: string;
}

//signup validation using Yup
export const signupValidation = Yup.object({
  firstname: Yup.string().min(5),
  lastname: Yup.string().min(5),
  email: Yup.string().email('Please enter valid email').required('Please enter email'),
  password: Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Please enter valid password").required('Please Enter Password'),
  repassword: Yup.string().oneOf([Yup.ref("password")], "Password is not matched").required('Enter password')
})

const userInitialData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  repassword: ''
}
const Signup: React.FC = () => {
  const navigate = useNavigate();

  //formik 
  // const { values, handleBlur, handleSubmit, handleChange, errors } = useFormik({
  //   initialValues: userInitialData,
  //   validationSchema: signupValidation,
  //   onSubmit: async (values) => {
  //     try {
  // const { repassword, ...datawithoutRePassword } = values;
  //       const response = await axios.post(`http://localhost:3001/register`, datawithoutRePassword);

  //       console.log(response.status);

  //       if (response.status === 200) {
  //         ToastFunc(response.data.message, 'success')
  //         navigate('/login')
  //         return;
  //       }
  //     } catch (error: any) {
  //       if (error.response.status === 409) {
  //         ToastFunc(error.response.data.error, 'warn')
  //       } else if (error.response.status === 500) {
  //         ToastFunc(error.response.data.error, 'warn')
  //       } else {
  //         ToastFunc(error.message, 'error')
  //       }
  //     }
  //   }
  // })
  // const [userData, setUserData] = useState<UserData>({
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   password: '',
  //   repassword: ''
  // });
  // const [formValid, setFormValid] = useState(false);

  // const { repassword, ...datawithoutRePassword } = userData;

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Password validation regex
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   if (!passwordRegex.test(userData.password)) {
  //     ToastFunc("Password should contain at least one uppercase letter, one digit, one special character, and be at least 8 characters long.", "error");
  //     return;
  //   }

  //   if (userData.password.trim() !== userData.repassword.trim()) {
  //     ToastFunc("Both password is not match", 'error')
  //     return;
  //   }
  //   if (
  //     userData.email.trim() === '' ||
  //     userData.password.trim() === '' ||
  //     userData.repassword.trim() === ''
  //   ) {
  //     ToastFunc("Please fill all fields", 'error')
  //     return;
  //   }


  //   try {
  //     const response = await axios.post(`http://localhost:3001/register`, datawithoutRePassword);

  //     console.log(response.status);

  //     if (response.status === 200) {
  //       ToastFunc(response.data.message, 'success')
  //       navigate('/login')
  //       return;
  //     }
  //   } catch (error: any) {
  //     if (error.response.status === 409) {
  //       ToastFunc(error.response.data.error, 'warn')
  //     } else if (error.response.status === 500) {
  //       ToastFunc(error.response.data.error, 'warn')
  //     } else {
  //       ToastFunc(error.message, 'error')
  //     }
  //   }

  // };

  return (
    <div className={classes['signup-main']}>
      <div className={classes['assests-signup']}>
        <img src={Assets.images.Signup} alt='signup' />
      </div>
      <div className={classes['form-control']}>
        <Formik
          initialValues={userInitialData}
          validationSchema={signupValidation}
          onSubmit={async (values) => {
            try {
              const { repassword, ...datawithoutRePassword } = values;
              const response = await axios.post(`http://localhost:3001/register`, datawithoutRePassword);
              if (response.status === 200) {
                ToastFunc(response.data.message, 'success')
                navigate('/login')
                return;
              }
            } catch (error: any) {  
              if (error.response.status === 409 || error.response.status === 500) {
                ToastFunc(error.response.data, 'warn')
              }else {
                ToastFunc(error.message, 'error')
              }
            }
          }
          }>
          {({ errors }) => (
            <Form method='POST' action='#' className={classes.form}>
              <div className={classes['input-control']}>
                <label htmlFor="fname">First name:</label><br />
                <Field
                  type="text"
                  id="fname"
                  name="firstname" />
                {errors.firstname && <small>{errors.firstname}</small>}
                <br />
              </div>
              <div className={classes['input-control']}>
                <label htmlFor="lname">Last name:</label><br />
                <Field
                  type="text"
                  id="lname"
                  name="lastname"
                />
                {errors.lastname && <small>{errors.lastname}</small>}
                <br />
              </div>
              <div className={classes['input-control']}>
                <label htmlFor="lname">Email<sup style={{ color: 'red' }}>*</sup>:</label><br />
                <Field
                  type="email"
                  id="email"
                  name="email" />
                {errors.email && <small>{errors.email}</small>}
                <br />
              </div>
              <div className={classes['input-control']}>
                <label htmlFor="lname">Password<sup style={{ color: 'red' }}>*</sup>:</label><br />
                <Field
                  type="password"
                  id="password"
                  name="password" />
                {errors.password && <small>{errors.password}</small>}
                <br />
              </div>
              <div className={classes['input-control']}>
                <label htmlFor="lname">Re-password<sup style={{ color: 'red' }}>*</sup>:</label><br />
                <Field
                  type="password"
                  id="repassword"
                  name="repassword" />
                {errors.repassword && <small>{errors.repassword}</small>}
                <br />
              </div>
              <br /><br />

              <Button style={{ padding: '5% 15%' }} type='submit'>Signup</Button><br /><br />

              <span>Already have an account? <Link to='/login' className={classes.link}>Click here</Link></span>
            </Form>
          )}
        </Formik>

      </div>
    </div >
  );
};

export default Signup;

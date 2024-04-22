import React, { useState, useEffect } from 'react';
import classes from './login.module.css';
import { Assets } from '../../../Assets/Assets';
import Button from '../../../Components/UI/Button/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import { ToastFunc } from '../../../utils/ToastFun';
import { setIsAuthenticated } from '../../../ReduxTool/AuthDataSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'


interface UserData {
  email: string;
  password: string;
}
export const loginValidation = Yup.object({
  email: Yup.string().email('Please enter valid email').required('Please enter email'),
  password: Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Please enter valid password").required('Please Enter Password'),
})
const userInitialData = {
  email: '',
  password: ''
}
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={classes['login-main']}>
      <div className={classes['assests-login']}>
        <img src={Assets.images.Login} alt='login' />
      </div>
      <div className={classes['form-control']}>
        <Formik
          initialValues={userInitialData}
          validationSchema={loginValidation}
          onSubmit={async (values, { setSubmitting }) => {
            const { password, ...withoutPasswordData } = values
            try {
              const response = await axios.post(`http://localhost:3001/register/login`, values)

              if (response.status === 200) {
                ToastFunc(response.data.message, 'success')
                dispatch(setIsAuthenticated({ userData: withoutPasswordData, token: response.data.token }))
                navigate('/')
                return;
              }
            } catch (error: any) { 
              if (error.response) {
                if (error.response.status === 409 || error.response.status === 500 || error.response.status === 401) {
                  ToastFunc(error.response.data, 'warn');
                } else {
                  ToastFunc(error.response.data, 'error');
                }
              } else {
                ToastFunc(error.message, 'error');
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className={classes.form}>
              <div className={classes['input-control']}>
                <label htmlFor='email'>Email:</label><br />
                <Field
                  type='text'
                  id='email'
                  name='email'
                />
                {errors.email && <small>{errors.email}</small>}
                <br />

              </div>
              <div className={classes['input-control']}>
                <label htmlFor='password'>Password:</label><br />
                <Field
                  type='password'
                  id='password'
                  name='password' />
                {errors.password && <small>{errors.password}</small>}
                <br />
              </div>
              <br /><br />

              <Button style={{ padding: '5% 15%' }} type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button><br /><br />
              <span>Don't have an account? <Link to='/signup' className={classes.link}>Click here</Link></span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

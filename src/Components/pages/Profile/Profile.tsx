import { useDispatch, useSelector } from "react-redux";
import classes from './Profile.module.css'
import { useEffect, useState } from "react";
import { ToastFunc } from "../../../utils/ToastFun";
import { getUserDetails, updateDetails } from "../../../ReduxTool/profileSlice";
import { setHideUserEdit, setShowUserEdit } from "../../../ReduxTool/uiSlice";
import { AppDispatch, RootState } from "../../../ReduxTool/State/Store";
import { useNavigate } from "react-router";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'

export const profileValidation = Yup.object({
  firstname: Yup.string().min(5),
  lastname: Yup.string().min(5),
  phoneno: Yup.string().matches(/^\d{10}$/, 'Enter valid phone number')
})


const Profile = () => {
  const user = useSelector((state: any) => state.ProfileSlice.userProfile as Record<string, string | number>);

  const initialProfileValues = {
    firstname: user?.first_name || '',
    lastname: user?.last_name || '',
    phoneno: user?.phone_no || ''
  };
  const showEdit = useSelector((state: RootState) => state.UISlice.showUserEdit)

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails())
  }, []);


  return (
    <div className={classes["profile-container"]}>
      <div className={classes["main-container"]}>
        <h1>Profile Page</h1>

        {showEdit ?
          <Formik
            initialValues={initialProfileValues}
            validationSchema={profileValidation}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await dispatch(updateDetails(values))
                navigate(-1)
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form className={classes["profile-form"]}>
                <div className={classes['input-control']}>
                  <Field
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                  />
                  {errors.firstname && <small className={classes.error}>{errors.firstname}</small>}
                </div>

                <div className={classes['input-control']}>
                  <Field
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                  />
                  {errors.lastname && <small className={classes.error}>{errors.lastname}</small>}
                </div>

                <div className={classes['input-control']}>
                  <Field
                    type="email"
                    placeholder="Email"
                    value={user?.email}
                    readOnly
                    disabled
                  />
                </div>

                <div className={classes['input-control']}>
                  <Field
                    type="tel"
                    placeholder="Phone No"
                    name="phoneno"
                  />
                  {errors.phoneno && <small className={classes.error}>{errors.phoneno}</small>}
                </div>
                <div className={classes['btn-container']}>
                  <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update'}</button>
                  {/* <button className={classes["delete"]}>Delete</button> */}
                  <button className={classes["cancle"]} onClick={() => dispatch(setHideUserEdit())}>Cancle</button>
                </div>
              </Form>
            )}</Formik> :
          <div className={classes['user-profile']}>
            <p><label>First Name : </label><span>{user?.first_name}</span></p>
            <p><label>Last Name : </label><span>{user?.last_name}</span></p>
            <p><label>Email : </label><span>{user?.email}</span></p>
            <p><label>Phone No. : </label><span>{user?.phone_no}</span></p>
            <div className={classes['btn-container']}>
              <button onClick={() => dispatch(setShowUserEdit())}>Edit Profile</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Profile;

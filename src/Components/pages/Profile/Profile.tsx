import { useDispatch, useSelector } from "react-redux";
import classes from './Profile.module.css'
import { useEffect, useState } from "react";
import { ToastFunc } from "../../../utils/ToastFun";
import { getUserDetails, updateDetails } from "../../../ReduxTool/profileSlice";
import { setHideUserEdit, setShowUserEdit } from "../../../ReduxTool/uiSlice";
import { AppDispatch, RootState } from "../../../ReduxTool/State/Store";
import { useNavigate } from "react-router";

const Profile = () => {
  const user = useSelector((state: any) => state.ProfileSlice.userProfile as Record<string, string | number>);

  const showEdit = useSelector((state:RootState)=>state.UISlice.showUserEdit)
  const [userData, setUserData] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    phone_no: user?.phone_no
  });
  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    phone_no: ''
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails())
    setUserData(
      {
        first_name: user?.first_name,
        last_name: user?.last_name,
        phone_no: 0 || user?.phone_no
      }
    )
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform validation
    if (/^\d{10}$/.test(userData?.phone_no.toString().trim())) {
      // Dispatch action to update user details
      dispatch(updateDetails(userData))
      setUserData({
        first_name: '',
        last_name: '',
        phone_no: ''
      })
      navigate(-1)
    } else {
      ToastFunc('Phone number is not valid', 'error')
    }
  };

  return (
    <div className={classes["profile-container"]}>
      <div className={classes["main-container"]}>
        <h1>Profile Page</h1>
        {showEdit ? <form onSubmit={handleSubmit} className={classes["profile-form"]}>
          <input
            type="text"
            placeholder="First Name"
            value={userData.first_name}
            onChange={handleChange}
            name="first_name"
            required
          />
          {formErrors.first_name && <p className={classes.error}>{formErrors.first_name}</p>}
          <input
            type="text"
            placeholder="Last Name"
            value={userData.last_name}
            onChange={handleChange}
            name="last_name"
            required
          />
          {formErrors.last_name && <p className={classes.error}>{formErrors.last_name}</p>}
          <input
            type="email"
            placeholder="Email"
            value={user?.email || ''}
            readOnly
            disabled
          />

          <input
            type="tel"
            placeholder="Phone No"
            value={userData.phone_no}
            onChange={handleChange}
            name="phone_no"
            required
          />
          <div className={classes['btn-container']}>
            <button type="submit">Update</button>
            {/* <button className={classes["delete"]}>Delete</button> */}
            <button className={classes["cancle"]} onClick={() => dispatch(setHideUserEdit())}>Cancle</button>
          </div>
        </form> : 
        <div className={classes['user-profile']}>
          <p><label>First Name : </label><span>{user?.first_name}</span></p>
          <p><label>Last Name : </label><span>{user?.last_name}</span></p>
          <p><label>Email : </label><span>{user?.email}</span></p>
          <p><label>Phone No. : </label><span>{user?.phone_no}</span></p>
          <div className={classes['btn-container']}>
            <button onClick={() =>  dispatch(setShowUserEdit())}>Edit Profile</button>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default Profile;

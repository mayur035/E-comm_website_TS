import { Add, AddBox, Close, Delete, Edit } from '@mui/icons-material'
import classes from './Address.module.css'
import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, getAddress, postAddress, updateAddress } from '../../../ReduxTool/addressSlice'
import { AppDispatch, RootState } from '../../../ReduxTool/State/Store'
import { ToastFunc } from '../../../utils/ToastFun'
import { postOrderHistoryData } from '../../../ReduxTool/orderHistorySlice'
import { clearCart, getItems } from '../../../ReduxTool/ProductCartSlice'
import { useNavigate } from 'react-router'


const Address = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [addressId, setAddressId] = useState()
    const [showForm, setShowForm] = useState<boolean>(false)
    const [address, setAddress] = useState({
        address1: '',
        address2: '',
        area: '',
        city: '',
        pincode: '',
        state: ''
    })
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const handleRadioChange = (event: any) => {
        setSelectedAddressId(event.target.value);
    };

    useEffect(() => {
        dispatch(getAddress())
    }, [])

    const addressSelector = useSelector((state: RootState) => state.AddressSlice.address as [])
    const cartStatus = useSelector((state: RootState) => state.ProductCart.status)

    const [toggle, setToggle] = useState(true)
    const handleEdit = (address: any) => {
        setToggle(false)
        setAddress({
            address1: address.address1,
            address2: address.address2,
            area: address.area,
            city: address.city,
            pincode: address.pincode,
            state: address.state
        })
        setAddressId(address.id)
        setShowForm(true)
    }
    const handleConfirmAddress = async () => {
        if (selectedAddressId === null) {
            return ToastFunc("Select Address", "warn")
        } else {
            if (cartStatus === 'success') {
                await dispatch(postOrderHistoryData(selectedAddressId))
                await dispatch(clearCart())
                dispatch(getItems())
                navigate('/')
                return ToastFunc("Order confrim", "success")
            } else {
                console.log('hello');
            }

        }

    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCancle = (e: any) => {
        e.preventDefault()
        setToggle(true)
        setAddress({
            address1: '',
            address2: '',
            area: '',
            city: '',
            pincode: '',
            state: ''
        })
    }

    const handlePost = async () => {
        await dispatch(postAddress(address))
        await dispatch(getAddress())
        setShowForm(false)
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setAddress({
            address1: '',
            address2: '',
            area: '',
            city: '',
            pincode: '',
            state: ''
        })

    }
    return (
        <div className={classes["profile-container"]}>
            <div className={classes['main-container']}>
                <h1>Address</h1>
                <div className={classes['address-field']}>
                    <div className={classes['address']}>
                        <table width='90%'>
                            <tbody>
                                {addressSelector && addressSelector?.length === 0 ? (
                                    <p style={{ fontSize: '30px', padding: '30px 0px' }}>No address</p>
                                ) : (
                                    addressSelector && addressSelector.map((address: Record<string, string | number>) => (
                                        <tr key={address.id}>
                                            <td><input style={{ cursor: 'pointer' }} id={address.id.toString()} type='radio' name='address' value={address.id} onChange={handleRadioChange} /></td>
                                            <td><label style={{ cursor: 'pointer' }} htmlFor={address.id.toString()}>{address.address1},{address.address2},{address.area},{address.city}-{address.pincode},{address.state}</label></td>
                                            <td><IconButton color='warning' onClick={() => handleEdit(address)}><Edit /></IconButton></td>
                                            <td><IconButton color='error' onClick={async () => {
                                                await dispatch(deleteAddress(Number(address.id)))
                                                dispatch(getAddress())
                                            }}><Delete /></IconButton></td>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                    {addressSelector?.length !== 0 && <div className={classes['btn-container']}>
                        <button className={classes['next']} onClick={handleConfirmAddress}>Confirm Address</button>
                    </div>}
                    <div className={classes['address-input']}>

                        {showForm ? <form action="" onSubmit={handleSubmit} className={classes["address-form"]}>
                            <div className={classes['close-btn']}><IconButton onClick={() => { setShowForm(false) }}><Close /></IconButton></div>
                            <div className={classes['input-control']}>
                                <input type="text" placeholder='Address line-1' name="address1" value={address.address1} onChange={handleChange} />
                                <input type="text" placeholder='Address line-2' name="address2" value={address.address2} onChange={handleChange} />
                            </div>
                            <input type="text" placeholder='Area' name="area" value={address.area} onChange={handleChange} />
                            <input type="text" placeholder='City' name="city" value={address.city} onChange={handleChange} />
                            <input type="text" placeholder='Pincode' name="pincode" value={address.pincode} onChange={handleChange} />
                            <input type="text" placeholder='State' name="state" value={address.state} onChange={handleChange} />
                            <div className={classes['btn-container']}>
                                {toggle ?
                                    <button className={classes['btn-control']} onClick={handlePost}>Add New Address</button> :
                                    <>
                                        <button
                                            onClick={
                                                async () => {
                                                    await dispatch(updateAddress({ addressId, address }))
                                                    await dispatch(getAddress())
                                                    setShowForm(false)
                                                }}
                                            className={`${classes['update']} ${classes['btn-control']}`}
                                        >Update Address</button>
                                        <button onClick={handleCancle} className={`${classes['cancle']} ${classes['btn-control']}`}
                                        >Cancle</button>
                                    </>
                                }
                            </div>
                        </form> : <div onClick={() => setShowForm(true)} className={classes['add-address']}>
                            <IconButton color='warning' ><AddBox /></IconButton><h4>Add Address</h4>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Address
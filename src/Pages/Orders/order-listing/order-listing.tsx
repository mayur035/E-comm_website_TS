import React, { useEffect } from 'react'
import classes from './order-listing.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDatails, getOrderHistoryData } from '../../../ReduxTool/orderHistorySlice';
import { AppDispatch, RootState } from '../../../ReduxTool/State/Store';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';
import { Assets } from '../../../Assets/Assets';
import { Link } from 'react-router-dom';


const OrderListing = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getOrderHistoryData())
    }, [])
    const navigate = useNavigate();
    const historySelector = useSelector((state: RootState) => state.OrderHistory.orderHistoryData as Record<string, string | number>[])

    return (
        <div className={classes['listing-main']}>
            {historySelector && historySelector.length === 0 ?
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', height: '100%', width: '50%' }}>
                    <h1>No History</h1>
                    <img src={Assets.images.Empty} height='50%' width='50%' alt="" />
                    <h5>
                        <Link style={{ color: 'black' }} to='/productListing'>Let's Shopping something</Link>
                    </h5>
                </div>
                :
                <React.Fragment>
                <h2>Order List</h2>
                <table className={classes['table']}>
                    <thead className={classes['thead']}>
                        <tr className={classes['tr']}>
                            <th className={classes['th']}>Order ID</th>
                            <th className={classes['th']}>No of Items</th>
                            <th className={classes['th']}>Quantity</th>
                            <th className={classes['th']}>Total Amount</th>
                            <th className={classes['th']}>Address</th>
                            <th className={classes['th']}>Date</th>
                            <th className={classes['th']}>Order Status</th>
                            <th className={classes['th']}>View details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historySelector && historySelector.map((order: any) => {
                            return (
                                <tr key={order.id} className={classes['tr']}>
                                    <td className={classes['td']}>{order.id}</td>
                                    <td className={classes['td']}>{order.metadata.products.length}</td>
                                    <td className={classes['td']}>{order.metadata.products.reduce((prevState: any, product: any) => {
                                        return product.quantity + prevState
                                    }, 0)}</td>
                                    <td className={classes['td']}>${order.metadata.Total}</td>
                                    <td className={classes['td']}>{order.address.address1},{order.address.address2},{order.address.area},{order.address.city}-{order.address.pincode},{order.address.state}</td>
                                    <td className={classes['td']}><Moment format="DD/MM/YYYY" date={order.created_at} /></td>
                                    <td className={classes['td']}>{order.order_status
                                    }</td>
                                    <td className={classes['td']}><button onClick={() => { dispatch(getOrderDatails(order.id)); navigate('/orderDetails') }} className={classes['view-btn']}>View</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </React.Fragment>
            }
        </div>
    )
}

export default OrderListing
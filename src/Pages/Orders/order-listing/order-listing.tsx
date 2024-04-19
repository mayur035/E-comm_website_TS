import React, { useEffect } from 'react'
import classes from './order-listing.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDatails, getOrderHistoryData } from '../../../ReduxTool/orderHistorySlice';
import { RootState } from '../../../ReduxTool/State/Store';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';


const OrderListing = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderHistoryData())
    }, [])
    const navigate = useNavigate();
    const historySelector = useSelector((state: RootState) => state.OrderHistory.orderHistoryData as Record<string, string | number>[]) 

        

    return (
        <div className={classes['listing-main']}>
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
                                <td className={classes['td']}><button onClick={()=>{dispatch(getOrderDatails(order.id));navigate('/orderDetails')}} className={classes['view-btn']}>View</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default OrderListing
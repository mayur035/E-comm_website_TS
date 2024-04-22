import { useSelector } from 'react-redux';
import { RootState } from '../../../ReduxTool/State/Store';
import classes from './order-details.module.css'
import React from 'react';
import OrderItems from './order-items/order-items';
import Moment from 'react-moment';

const OrderDetails = () => {
    const orderDataSelector = useSelector((state: RootState) => state.OrderHistory.orderDetailsData as Record<string, string | number | any>[])
    return (
        <div className={classes['order-main']}>
            <div className={classes['order-container']}>
                <div className={classes['order-total-content']}>
                    <p><b>Ordered Id : </b>{orderDataSelector[0] && orderDataSelector[0].id}</p>
                    <p><b>Ordered Date : </b><Moment format="DD/MM/YYYY" date={orderDataSelector[0] && orderDataSelector[0].created_at} /></p>
                    <p><b>Address : </b>{orderDataSelector[0] && orderDataSelector[0].address.address1},{orderDataSelector[0] && orderDataSelector[0].address.address2},{orderDataSelector[0] && orderDataSelector[0].address.area},{orderDataSelector[0] && orderDataSelector[0].address.city}-{orderDataSelector[0] && orderDataSelector[0].address.pincode},{orderDataSelector[0] &&orderDataSelector[0].address.state}</p>
                </div>

                <div className={classes['order-item-list']}>
                    <div className={classes['order-item-header']}>
                        <p className={classes['order-product']}>Product</p>
                        <div className={classes['order-quantity-total']}>
                            <p className={classes['order-quanity-heading']}>Quanity</p>
                            <p className={classes['order-subtotal-heading']}>Sub Total</p>
                        </div>
                    </div>
                    <hr />
                    <div className={classes.orderItems}>
                        {orderDataSelector[0] && orderDataSelector[0].metadata.products.map((item: any, index: any) => (
                            <React.Fragment key={index}>
                                <OrderItems items={item} />
                                <hr />
                            </React.Fragment>
                        ))}
                    </div>
                        <div style={{display:'flex',justifyContent:'flex-end',paddingTop:'30px',fontSize:'20px'}}>
                        <p><b>Total Amount : </b>{orderDataSelector[0] && orderDataSelector[0].metadata.Total}</p>
                        </div>
                </div>

            </div>
        </div>
    )
}

export default OrderDetails
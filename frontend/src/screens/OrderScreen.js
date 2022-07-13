import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'; //Because it is a named export, not default export
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderScreen(props) {
    const { orderId } = useParams();


    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;


    console.log("order from Order screennnnnnyoo : ");
    console.log(order);


    const dispatch = useDispatch();

    useEffect(() => {

        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');

            console.log("Paypal Dataaaaaaaaaaaaaaaaaaa : ");
            console.log(data);

            const script = document.createElement('script');

            script.type = "text/javascript";

            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;

            script.async = true;

            script.onload = () => {
                setSdkReady(true);
            };

            document.body.appendChild(script);
        };

        //console.log("order._id : " + order._id);

        if (!order) { //Here it should be (!order._id)
            console.log("First if is done.");
            dispatch(detailsOrder(orderId));
        } else {
            console.log("elseeeeeee is done")
            if (!order.isPaid) {
                console.log("orderrr.isPaid");
                if (!window.paypal) {
                    console.log("windowwww.paypal");
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }


    }, [orderId, dispatch, order, sdkReady]);

    const successPaymentHandler = () =>{
        //TODO: dispatch pay order
    }


    return loading ? (<LoadingBox></LoadingBox>)
        : error ? (<MessageBox variant="danger" >{error}</MessageBox>)
            : (
                <div>

                    <h1>Order {order._id}  </h1>
                    <div className='row top' >
                        <div className='col-2' >
                            <ul>

                                <li>
                                    <div className='card card-body' >
                                        <h2> Shipping </h2>
                                        <p>
                                            <strong> Name: </strong>{order.shippingAddress.fullName} <br />
                                            <strong> Address: </strong>{order.shippingAddress.address},
                                            {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                            {order.shippingAddress.country}
                                        </p>

                                        {
                                            order.isDelivered
                                                ? <MessageBox variant="success" >Delivered at {order.deliveredAt}</MessageBox>
                                                : <MessageBox variant="danger" > Not Delivered </MessageBox>
                                        }
                                    </div>
                                </li>


                                <li>
                                    <div className='card card-body' >
                                        <h2> Shipping Method</h2>
                                        <p>
                                            <strong> Method: </strong>{order.paymentMethod}

                                        </p>

                                        {
                                            order.isPaid
                                                ? <MessageBox variant="success" >Paid at {order.paidAt}</MessageBox>
                                                : <MessageBox variant="danger" > Not Paid </MessageBox>
                                        }
                                    </div>
                                </li>


                                <li>
                                    <div className='card card-body' >
                                        <h2> Order Items </h2>

                                        <ul>
                                            {
                                                order.orderItems.map((item) => (
                                                    <li key={item.product}>

                                                        <div className='row'>

                                                            <div>
                                                                <img src={item.image}
                                                                    alt={item.name}
                                                                    className="small"></img>
                                                            </div>


                                                            <div className="min-30" >
                                                                <Link to={`/product/${item.product}`}> {item.name} </Link>
                                                            </div>

                                                            <div>
                                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                                            </div>

                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>



                            </ul>
                        </div>

                        <div className='col-1' >
                            <div className='card card-body'>
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>

                                    <li>
                                        <div className='row'>
                                            <div>Items</div>
                                            <div>${order.itemsPrice}</div>
                                        </div>
                                    </li>
                                    {
                                        //toFixed(2)
                                    }

                                    <li>
                                        <div className='row'>
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice}</div>

                                        </div>
                                    </li>

                                    <li>
                                        <div className='row'>
                                            <div>Tax</div>
                                            <div>${order.taxPrice}</div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className='row'>
                                            <div>
                                                <strong>Order Total</strong>
                                            </div>
                                            <div>
                                                <strong> ${order.totalPrice}</strong>
                                            </div>

                                        </div>
                                    </li>

                                    {
                                        !order.isPaid && (
                                            <li>
                                                {
                                                    !sdkReady ? (<LoadingBox></LoadingBox>)
                                                        : (
                                                            <PayPalButton
                                                                amount={order.totalPrice}
                                                                onSuccess={successPaymentHandler}
                                                            ></PayPalButton>
                                                        )
                                                }
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            )
};

export default OrderScreen
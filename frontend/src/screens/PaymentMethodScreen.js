import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentMethodScreen() {
    const navigate = useNavigate();

    const cart = useSelector( (state)=> state.cart );
    const { shippingAddress } = cart;

    console.log("shippingAddress " );
    console.log( shippingAddress );

    if( !shippingAddress.address ){
        navigate('/placeorder');
    }

    const [ paymentMethod, setPaymentMethod ] = useState("payPal");


    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod ));
        navigate('/placeorder');
    }


    return (
        <div>
            < CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <form className='form' onSubmit={submitHandler} >

                <div>
                    <h1>Payment Method</h1>
                </div>

                <div>
                    <div>
                        <input
                            type="radio"
                            id="paypal"
                            value="payPal"
                            name="paymentMethod"
                            required 
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </input>
                        <label htmlFor="paypal" >PayPal</label>
                    </div>
                </div>


                <div>
                    <div>
                        <input
                            type="radio"
                            id="stripe"
                            value="stripe"
                            name="paymentMethod"
                            required 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </input>
                        <label htmlFor="stripe" >Stripe</label>
                    </div>
                </div>

                <div>
                    <button className='primary' type='submit' > Continue </button>
                </div>

            </form>
        </div>
    )
}

export default PaymentMethodScreen
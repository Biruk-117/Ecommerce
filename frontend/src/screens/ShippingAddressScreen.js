import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingAddressScreen() {
    const navigate = useNavigate();

    const userSignin = useSelector( (state) => state.userSignin );
    const { userInfo } = userSignin;

    const cart = useSelector( (state)=> state.cart );
    const { shippingAddress } = cart;

    console.log("userInfo in shipping" + userInfo);

    if( !userInfo ){
        navigate('/signin');
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalcode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);


    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress( { fullName, address, city, postalCode, country } ));

        navigate('/payment');
    }

    return (
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <form className='form' onSubmit={submitHandler} >
                <div>
                    <h1> Shipping Address </h1>
                </div>

                <div>
                    <label htmlFor='fullName' > Full Name </label>
                    <input type='text'
                        id='fullName'
                        placeholder='Enter your full name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} required
                    ></input>
                </div>

                <div>
                    <label htmlFor='address' > Address </label>
                    <input type='text'
                        id='address'
                        placeholder='Enter your address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} required
                    ></input>
                </div>

                <div>
                    <label htmlFor='city' > City</label>
                    <input type='text'
                        id='city'
                        placeholder='Enter your city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)} required
                    ></input>
                </div>

                <div>
                    <label htmlFor='postalCode' > Postal code </label>
                    <input type='text'
                        id='fullName'
                        placeholder='Enter your postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalcode(e.target.value)} required
                    ></input>
                </div>

                <div>
                    <label htmlFor='country' > Country </label>
                    <input type='text'
                        id='country'
                        placeholder='Enter your country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)} required
                    ></input>
                </div>

                <div>
                    <label />
                    <button className='primary' type='submit'> Continue </button>
                </div>

            </form>
        </div>
    )
}

export default ShippingAddressScreen
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setpassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const dispatch = useDispatch(); 

    const [searchParams] = useSearchParams();

    
    const redirect = searchParams.get('redirect')? searchParams.get('redirect') : '/';
    


    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    // console.log("userInfo");
    // console.log(userInfo);
    // console.log("loading");
    // console.log(loading);
    // console.log("error");
    // console.log(error);

    const submitHandler = (e)=>{
        e.preventDefault();//When submit button gets clicked, form will not be refreshed

        if( password !== confirmPassword ){
            alert( 'Password and confirm password are not match' );
        }else{
            dispatch( register( name, email, password ) );
        }
    };

    const navigate = useNavigate();

    useEffect( ()=>{
        if( userInfo ){
            if( redirect === '/' )
            {
                navigate('/');
            }else{
                navigate(`/${redirect}`);
            }

        }
    }, [ userInfo, redirect, navigate ] );

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1> Register </h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant="danger" >{error}</MessageBox>
                }

                <div>
                    <label htmlFor="name" > Name </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        required
                        onChange={e => setName(e.target.value)} >

                    </input>
                </div>


                <div>
                    <label htmlFor="email" > Email address </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={e => setEmail(e.target.value)} >

                    </input>
                </div>

                <div>
                    <label htmlFor="password" > Password </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={e => setpassword(e.target.value)} >

                    </input>
                </div>

                <div>
                    <label htmlFor="confirmPassword" > Confirm Password </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Enter confirm password"
                        required
                        onChange={e => setConfirmPassword(e.target.value)} >

                    </input>
                </div>

                <div>
                    <label/>
                    <button className="primary" type="submit"> Register </button>
                </div>

                <div> 
                    <label/>
                    <div>
                        Already have an account? {' '} 
                        <Link to="/signin" > signin </Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default RegisterScreen
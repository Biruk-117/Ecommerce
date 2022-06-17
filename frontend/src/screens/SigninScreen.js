import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../actions/userActions';
import { useSearchParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen() {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';


    const userSinin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSinin;

    const submitHandler = (e) => {
        e.preventDefault();//When submit button gets clicked, form will not be refreshed

        dispatch(signin(email, password));
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            if (redirect === '/') {
                navigate('/');
            } else {
                navigate(`/${redirect}`);
            }
        }
    }, [userInfo, redirect, navigate]);


    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1> Sign In </h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant="danger" >{error}</MessageBox>
                }

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
                    <label />
                    <button className="primary" type="submit"> Sign In </button>
                </div>

                <div>
                    <label />
                    <div>
                        New customer? {' '}
                        <Link to = { `/register?redirect=${redirect}` } > create your account </Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default SigninScreen
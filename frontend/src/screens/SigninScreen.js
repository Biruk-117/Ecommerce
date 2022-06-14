import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function SigninScreen() {

    const [ email, setEmail ] = useState('');
    const [ password, setpassword ] = useState('');

    const submitHandler = (e)=>{
        e.preventDefault();//When submit button gets clicked, form will not be refreshed
        //TODO: signin action
    }


    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1> Sign In </h1>
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
                    <label/>
                    <button className="primary" type="submit"> Sign In </button>
                </div>

                <div> 
                    <label/>
                    <div>
                        New customer? {' '} 
                        <Link to="/register" > create your account </Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default SigninScreen
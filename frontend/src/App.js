import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import ErrorPage from './screens/ErrorPage';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import { useDispatch } from 'react-redux'
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';


function App() {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSinin = useSelector((state) => state.userSignin);
    const { userInfo } = userSinin;


    const dispatch = useDispatch();

    const signOutHandler = () =>{
        dispatch( signout() );
    }


    return (
        <Router>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link to="/" className="brand"> <img src="https://img.icons8.com/ios-filled/50/000000/checkout.png" alt='' /> Easy Way </Link>
                    </div>

                    <div className="Cart-signin-padding">
                        <Link to="/cart" >Cart
                            {
                                cartItems.length > 0 && (
                                    <span className="badge" >  {cartItems.length}  </span>
                                )
                            }
                        </Link>
                        {
                            userInfo ? (
                                <div className='dropdown' >
                                    <Link to="#" >
                                        {userInfo.name} <i className='fa fa-caret-down' ></i>
                                    </Link>

                                    <ul className='dropdown-content'>
                                        <Link to="#signout" onClick={signOutHandler} >
                                            Sign Out
                                        </Link>
                                    </ul>

                                </div>

                            ) :
                                (
                                    <Link to="/Signin" >Sign In</Link>
                                )
                        }

                    </div>
                </header>

                <main>
                    <Routes>
                        <Route path="/signin" element={<SigninScreen />}  ></Route>
                        <Route path="/register" element={<RegisterScreen />}  ></Route>
                        <Route path="/cart" element={<CartScreen />}  ></Route>
                        <Route path="/cart/:productId" element={<CartScreen />}  ></Route>
                        <Route exact path="/" element={<HomeScreen />} ></Route>
                        <Route path="/product/:productId" element={<ProductScreen />} ></Route>
                        <Route path="*" element={<ErrorPage />} ></Route>
                    </Routes>
                </main>

                <footer className="row center">
                    <div>All right reserved</div>
                </footer>

            </div>
        </Router>
    );
}

export default App;

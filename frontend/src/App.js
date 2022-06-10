import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import ErrorPage from './screens/ErrorPage';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {

    const cart = useSelector( (state) => state.cart );
    const { cartItems } = cart;

  return (
    <Router>
        <div className="grid-container">
            <header className="row">
                <div>
                    <Link to="/" className="brand"> <img src="https://img.icons8.com/ios-filled/50/000000/checkout.png" alt=''/> Easy Way </Link>
                </div>

                <div className="Cart-signin-padding">
                    <Link to="/cart" >Cart
                    {
                        cartItems.length > 0 && (
                            <span className="badge" >  {cartItems.length}  </span>
                        )
                    }
                    </Link>
                    <Link to="/Signin" >Sign In</Link>
                </div>
            </header>

            <main>
                <Routes>
                    <Route path="/cart" element={<CartScreen/>}  ></Route>
                    <Route path="/cart/:productId" element={<CartScreen/>}  ></Route>
                    <Route exact path = "/" element = {<HomeScreen/>} ></Route>
                    <Route path = "/product/:productId" element = {<ProductScreen/>} ></Route>
                    <Route path = "*" element = {<ErrorPage/>} ></Route>
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

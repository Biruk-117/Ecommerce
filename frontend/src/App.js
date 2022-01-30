import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {
  return (
    <Router>
        <div className="grid-container">
            <header className="row">
                <div>
                    <a href="/" className="brand"> <img src="https://img.icons8.com/ios-filled/50/000000/checkout.png"/> Easy Way </a>
                </div>

                <div className="Cart-signin-padding">
                    <a href="/Cart" >Cart</a>
                    <a href="/Signin" >Sign In</a>
                </div>
            </header>

            <main>
                <Routes>
                    <Route path = "/product/:id" element = {<ProductScreen/>} ></Route>
                    <Route exact path = "/" element = {<HomeScreen/>} ></Route>
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

import React from 'react';
import data from './data';

function App() {
  return (
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
                <div className="row center" >
                    {
                        data.products.map( product => ( 

                        <div key={product._id} className="card">
                            <a href={`/product/${product._id}`}>

                                <img className="medium" 
                                src={product.image} 
                                alt={product.name} />
                            </a>

                            <div className="card-body" >
                                <a href={`/product/${product._id}`}>
                                    <h2>{product.name}</h2>
                                </a>

                                <div className="price">
                                    ${product.price}
                                </div>
                            </div>
                        </div>
                        ) )
                    }
                    
                    
                </div>
            </main>

            <footer className="row center">
                <div>All right reserved</div>
            </footer>
        </div>
  );
}

export default App;

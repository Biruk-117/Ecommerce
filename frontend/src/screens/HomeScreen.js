
import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux'
import { listProductsActionFunction } from '../actions/productActions';

export default function HomeScreen() {

    const dispatch = useDispatch();

    const productListStateFromReducer = useSelector((state) => state.productListStateFromReducer);
    
    console.log("Product list")
    console.log(productListStateFromReducer)

    const { loading, error, products } = productListStateFromReducer;

    useEffect(() => {
        dispatch(listProductsActionFunction());
    }, [dispatch]);

    return (
        <div>
            {
                loading ? (<LoadingBox></LoadingBox>) :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                        (
                            <div className="row center" >
                                {
                                    products.map(product => (
                                        <Product key={product._id} product={product}></Product>
                                    ))
                                }
                            </div>
                        )
            }
        </div>
    );
}

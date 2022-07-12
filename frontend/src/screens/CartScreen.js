import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { addToCartActionFunction, removeFromCartActionFunction } from '../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux'
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {

    const [searchParams] = useSearchParams();

    const { productId } = useParams();
    const qty = Number(searchParams.get('qty'));

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;


    useEffect(() => {
        if (productId) {
            dispatch(addToCartActionFunction(productId, qty));
        }
    }, [productId, qty, dispatch])

    const removeFromCartHandler = (id) => {
        dispatch( removeFromCartActionFunction(id) )
    }

    const navigate = useNavigate();

    const checkOutHandler = () =>{
        navigate('/signin?redirect=shipping');
    }

   

    return (
        <div className="row top">
            <div className="col-2" >
                <h1> Shopping Cart </h1>
                {
                    cartItems.length === 0 ? <MessageBox>
                        Cart is empty.
                        <Link to="/" > <span className='red'> GO SHOPPING </span> </Link>
                    </MessageBox>
                        :
                        (
                            <ul>
                                {
                                    cartItems.map((item) => (
                                        <li key={item.product}>

                                            <div className='row'>

                                                <div>
                                                    <img src={item.image}
                                                        alt={item.name}
                                                        className="small"></img>
                                                </div>


                                                <div className="min-30" >
                                                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                                                </div>


                                                <div>
                                                    <select
                                                        value={item.qty}
                                                        onChange={e =>
                                                            dispatch(addToCartActionFunction(
                                                                item.product,
                                                                Number(e.target.value)
                                                            )
                                                            )
                                                        }>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1} > {x + 1} </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>


                                                <div>
                                                    ${item.price}
                                                </div>


                                                <div>
                                                    <button type="button"
                                                        onClick={() => removeFromCartHandler(item.product)} >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                }
            </div>



            <div className='col-1'>
                <div className='card card-body' >
                    <ul>
                        <li>
                            <h2>
                                Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} iteams) :
                                ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>

                        <li>
                            <button type='button'
                                onClick={checkOutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0} >
                                Proceed to checkout
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

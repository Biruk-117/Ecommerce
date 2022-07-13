import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS
} from '../constants/orderConstants';



//order parameter is to be saved in the database
//dispatch and getState will be filled by redux thunk
export const createOrder = (order) => async (dispatch, getState) => {

    console.log( "orderrrrrrrrrrrrrr : " );
    console.log( order );

    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order,
    });


    try {

        const { userSignin: { userInfo } } = getState();

        console.log("userInfoooooooob : ");
        console.log(userInfo);

        Axios.post( '/api/orders' , order, {
            
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }).then( res =>{

            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: res.data.order
            });

            console.log(res.data);

        } );
        

        dispatch({
            type: CART_EMPTY,
        } );

        localStorage.removeItem("cartItems");

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message + "eeeONE"
                : error.response + "eeeTWO",
        } )
    }
};


export const detailsOrder = ( orderId ) => async( dispatch, getState ) => { // getState is used to get the token of the current user

    dispatch( { type: ORDER_DETAILS_REQUEST, payload: orderId } );

    const { userSignin : {userInfo} } = getState();
    console.log( "userInfo from order action : " );
    console.log(userInfo);

    console.log("whyyyyyyyyy");

    try{

        const { data } = await Axios.get(`/api/orders/${orderId}` , {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        console.log( "Dataaaaaaf from order action : " );
        console.log(data);


        dispatch( { type: ORDER_DETAILS_SUCCESS, payload: data } );

    }catch(error){

        const message = error.response && error.response.data.message ?
        error.response.data.message
        : error.response

        dispatch( { type: ORDER_DETAILS_FAIL, payload: message } );
    }
};
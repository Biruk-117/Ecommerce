import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

//status(400) means client error or validation error
//API for post request to /api/orders

orderRouter.post( '/', isAuth, expressAsyncHandler( async( req, res )=> {
    if( req.body.orderItems.length === 0 ){
        res.status(400).send( { message: 'Cart is empty' } );
    }else{
        const order = new Order( {
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.shippingAddress,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        } );

        const createdOrder = await order.save(); //To save order in the database

        res.status(201).send( { message: 'New Order Created', order: createdOrder } );
    }
} ) 
);


export default orderRouter;
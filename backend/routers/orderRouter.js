import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

//status(400) means client error or validation error
//API for post request to /api/orders

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });

        const createdOrder = await order.save() //To save order in the database

        //console.log(createdOrder);

        res
            .status(201)
            .send({ message: 'New Order Created', order: createdOrder });

    }
})
);



orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (order) {
        res.send(order);
    } else {
        res.send(404).send({ message: 'Order not found' });
    }
})

);

//we update the status of a resource whicj is order
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => { 

    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Data.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };

        const updatedOrder = await order.save();

        res.send({ message: 'Order Paid', order: updatedOrder }); //send to frontend
    }else{
        res.status(404).send({ message: 'Order Not Found' });
    }
})

);



export default orderRouter;
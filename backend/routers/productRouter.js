
import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

//API for List of products to frontend
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));


productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Product.remove({}); //helps us to add multiple product // Does not allow duplicate
    const createdProducts = await Product.insertMany(data.products);

    res.send({ createdProducts });
}));



//API for Details of product to frontend
productRouter.get('/:_id', expressAsyncHandler(async (req, res) => {

    const product = await Product.findById(req.params._id);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }

}));


export default productRouter;
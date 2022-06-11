import express from 'express'
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';


const app = express();

mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost/easyway_db', {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});


//Sends only one product
app.get('/api/products/:_id', (req, res) => {
    const product = data.products.find(x => x._id === req.params._id);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found( server side )  + ' })
    }
});


//Sends all of the products
app.get('/api/products', (req, res) => {
    res.send(data.products);
});



//Sends a text ( Server is ready )
app.get('/', (req, res) => {
    res.send('Server is ready');
});



app.use( '/api/users', userRouter );


//Error chacher
app.use( ( err, req, res, next )=>{
    res.status(500).send( {message: err.message } );
} )


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});
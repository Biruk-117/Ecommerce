import express from 'express'
//import res from 'express/lib/response';
import data from './data.js';


const app = express();

app.get('/api/products/:_id', (req, res) => {
    const product = data.products.find( x => x._id === req.params._id );

    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found( server side )  + ' })
    }
});


app.get('/api/products', (req, res) => {
    res.send(data.products);
});



app.get('/', (req, res) => {
    res.send('Server is ready');
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});
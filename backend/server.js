import express from 'express'
import data from './data.js';

//This is axios
//This should not be in master
const app = express();

app.get('/api/products', (req,res)=>{
    res.send(data.products);
} )

app.get('/', (req, res)=>{
    res.send('Server is ready');
})


const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`serve at http://localhost:${port}`);
})
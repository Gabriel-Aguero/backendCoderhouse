import express from 'express';
import ProductManager from './ProductManager.js'

const app = express();

const product = new ProductManager('db.txt');
product.addProduct("producto 1", "description 1", 200, "Sin imagen", "abc123", 25);
product.addProduct("producto 2", "description 2", 100, "Sin imagen", "abc123", 40);
product.addProduct("producto 3", "description 3", 500, "Sin imagen", "abc123", 100);
const productos = product.products;

app.get('/products', (req, res) => {    
    console.log(req.query)
    const limit = req.query.limit
    const productLimit = productos.slice(0, limit)
    if(productLimit) return res.send(productLimit)    
    res.send({Productos: products});        
})

app.get('/products/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    res.send(producto)
})

app.listen(8080)
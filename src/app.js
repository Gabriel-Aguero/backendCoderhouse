import express from 'express';
import ProductManager from './ProductManager.js'

const app = express();

const product = new ProductManager('db.json');

app.get('/products', async (req, res) => {
    
    const limit = req.query.limit;
    const producto = await product.getProducts();
    
    if(limit) {
        const productLimit = producto.slice(0, limit);
        res.send(productLimit)
    }else{
        res.send(producto);        
    }
})

app.get('/products/:id', async (req, res) => {
    
    const id = parseInt(req.params.id);
    const producto = await product.getProducts();
    const productoId = producto.find(p => p.id === id);
    res.send(productoId)
})

app.listen(8080)
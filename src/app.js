import express from 'express';
import ProductManager from './ProductManager.js'

const app = express();

const product = new ProductManager('db.json');

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const producto = await product.getProducts();
        
        if(limit) {
            const productLimit = producto.slice(0, limit);
            res.send(productLimit)
        }else{
            res.send(producto);        
        }        
    } catch (error) {
        console.log(error, 'Error al intentar recuperar la lista de productos');
    }
})

app.get('/products/:id', async (req, res) => {
    try {        
        const id = parseInt(req.params.id);
        const producto = await product.getProductById(id);
        
        producto ? res.send(producto) : res.send(`<h1>Not Found</h1>`)        
    } catch (error) {
        console.log(error, 'Error al intentar buscar por ID');
    }
})

app.listen(8080)
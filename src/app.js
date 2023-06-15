import express from 'express';
import ProductManager from './ProductManager.js'

const app = express();
const producto = new ProductManager('db.txt');
producto.addProduct("producto 1", "description 1", 200, "Sin imagen", "abc123", 25);
app.get('/', (req, res) => {
    res.send('ok')
    // const producto = new ProductManager('db.txt');
    // producto.addProduct("producto 1", "description 1", 200, "Sin imagen", "abc123", 25);
})
// app.get('/productos', (req, res) => {
    
//     res.json(producto)
// })

app.listen(8080)
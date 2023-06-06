const fs = require('fs');

class ProductManager {

    constructor() {
        this.products = [];
        this.path = 'db.txt';
        this.format = 'utf-8';
        this.nextId = 1;
    }

    addProduct = async (title, description, price, thumbnail, code, stock) =>{
        
        let newProduct = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.nextId++;
        this.products.push(newProduct);
        await fs.writeFileSync(this.path, JSON.stringify(this.products))
        console.log('Productos Agregados Correctamente!!!')
    }    

    readProduct = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.readFileSync(this.path, this.format)            
            return JSON.parse(data);
        } else return []
    }    

    getProducts = async () => {
        try {
            let res = await this.readProduct();
            return console.log(res);
        } catch (error) {
            console.log('No se encontro el archivo', error)        
        }
    }

    getProductById = async (id) => {
        try {
            let respuesta = await this.readProduct();
            if(!respuesta.find(product => product.id === id)){
              console.log('Producto no encontrado');
            } else {
                console.log(respuesta.find(product => product.id === id))
            }       
        } catch (error) {
            console.log('Ocurrio un error al leer el archivo', error)
        }
    }
    
    deleteProduct = async (id) => {
        let respuesta = await this.readProduct();
        let filter = respuesta.filter(product => product.id != id)
        await fs.writeFileSync(this.path, JSON.stringify(filter));
        console.log('Producto Eliminado Correctamente !!!')
    }

    updateProduct = async ({id, ...producto }) => {
       await this.deleteProduct(id);
       let productPreview = await this.readProduct();
       let productUpdate = [{ id, ...producto}, ...productPreview];
       await fs.writeFileSync(this.path, JSON.stringify(productUpdate));
    }
}


const producto = new ProductManager()
producto.addProduct(1, "producto 1", "description 1", 200, "Sin imagen", "abc123", 25);
producto.addProduct(2, "producto 2", "description 2", 100, "Sin imagen", "abc123", 40);
producto.addProduct(3, "producto 3", "description 3", 500, "Sin imagen", "abc123", 100);
// producto.getProducts();
// producto.getProductById(4);
// producto.deleteProduct(2)
// producto.updateProduct({
//     title:"producto modificado",
//     description:"description modificada",
//     price:50, 
//     thumbnail:"Sin imagen",
//     code:"abc136",
//     stock:10,
//     id:3, 
// });
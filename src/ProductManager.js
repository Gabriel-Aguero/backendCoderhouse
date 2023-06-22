import fs from 'fs';

export default class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
        this.format = 'utf-8';
        this.nextId = 1;
    }

    addProduct = async(title, description, price, thumbnail, code, stock) => {
        try {
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
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            console.log('Productos Agregados Correctamente!!!')
            
        } catch (error) {
            console.log(message.error);    
        }
    }

    readProduct = async() => {
        
        try {
            const data = await fs.promises.readFile(this.path, this.format)               
            return JSON.parse(data);                       
        } catch (error) {
        console.log(message.error) 
        }
        
    }

    getProducts = async() => {
        try {
            let res = await this.readProduct();       
            return res;            
        } catch (error) {
          console.log(message.error)  
        }

    }

    getProductById = async(id) => {
       try {
           let productos = await this.readProduct();           
           let respuesta = productos.find(product => product.id === id)
           if (!respuesta) {
               return `<h1 style="blue">Not Found</h1>`;
           } else {
               return respuesta;
           }
       } catch (error) {
         console.log(error,'Error al realizar la busqueda por ID')
       }
    }

    deleteProduct = (id) => {
        let respuesta = this.readProduct();
        let filter = respuesta.filter(product => product.id != id)
        !filter ? (
            fs.writeFileSync(this.path, JSON.stringify(filter)),
            console.log('Producto Eliminado Correctamente !!!')
        ) : (
            console.log('No se encuentro el producto !!!')
        );
    }

    updateProduct = (id, updateProperties) => {
        let listProduct = this.readProduct();                         
        let productPreview = listProduct.filter(product => product.id != id)
        let productUpdate = listProduct.find(product => product.id === id)               
        
        if (productUpdate){
          let objetPrimary = Object.assign({}, productUpdate, updateProperties)                                  
          let objetFinal = [objetPrimary, ...productPreview, ]                            
          fs.writeFileSync(this.path, JSON.stringify(objetFinal));
          console.log('Producto Actualizado Correctamente !!!')
        }                            
    }
}

// const producto = new ProductManager('db.txt')
// producto.addProduct("producto 1", "description 1", 200, "Sin imagen", "abc123", 25);
// producto.addProduct("producto 2", "description 2", 100, "Sin imagen", "abc123", 40);
// producto.addProduct("producto 3", "description 3", 500, "Sin imagen", "abc123", 100);
// producto.getProducts();
// module.exports = ProductManager;

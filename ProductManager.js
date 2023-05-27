class ProductManager{ 

    constructor () {
        this.products = [];
        this.path = "";
        this.nextId = 1;
    }


    addProduct(title, description, price, thumbnail, code, stock) {

        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log(`❗ Todos los campos son obligatorios `)
            return;
        }

        const product =  {
            id: this.nextId,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        };
        this.nextId++;
        this.products.push(product);
        console.log('Productos Agregados Correctamente!!!')
    }

    getProductByCode(code) {
        return this.products.find(product => product.code === code)
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id);
        if(!product){
         console.log(`Not found`);            
        }
        return product;
    }
}
const producto = new ProductManager()
producto.addProduct("Coca", "de 1 litro", 400, "imagen", 1000, 200);
console.log(producto.getProducts())

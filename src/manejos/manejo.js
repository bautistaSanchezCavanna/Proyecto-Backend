const fs = require("fs/promises");
const {existsSync} = require('fs');

class ProductManager {
  static contadorId = 0;

  constructor(path) {
    this.path = path;
  }

  async readFile(){
    const archivo = await fs.readFile(this.path, "utf-8");
    const productos = JSON.parse(archivo);
    return productos;
  }

  async writeFile(data){
    const string = JSON.stringify(data, null, '\t');
    await fs.writeFile(this.path, string);
  }

 async getProducts() {
    if (existsSync(this.path)) {
      return await this.readFile();
    } else {
      return [];
    }
  }

 async addProduct(newProduct) {
    const products = await this.getProducts();

    if (products.length === 0) {
      ProductManager.contadorId = 1;
    } else {
      ProductManager.contadorId = products[products.length - 1].id + 1;
    }

    if (!products.find((item) => item.code === newProduct.code)) {
      const productoNuevo = {
        id: ProductManager.contadorId,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        code: newProduct.code,
        stock: newProduct.stock
      };
    
      let product = {...productoNuevo, status: true, thumbnails: []}
      let atributos = Object.values(product);
      let validacion = atributos.filter((atributo) => atributo !== undefined);
      
      if (validacion.length < 8) {
        return console.log(
          "Falta rellenar un campo, todos los campos son obligatorios."
        );
      } else {
        products.push(product);
        await this.writeFile(products);
        console.log("Producto agregado exitosamente.");
        return product;
      }
    }else{
      console.log('El código de este producto ya está en uso.');
    }
  }

  async getProductById(id) {
    const productos = await this.getProducts();
    const filtrado = productos.find((prod) => prod.id === id);
    if (!filtrado) {
      console.log("Product Not Found");
    } else {
      return filtrado;
    }
  }

  async updateProduct(id, cambio) {
    const products = await this.getProducts();
    const product = await this.getProductById(id);

    const prodUpdated = {...product, ...cambio};

    const listaUpdated = products.map(item =>{
      if(item.id === prodUpdated.id){
        return prodUpdated;
      }else{
        return item;
      }
    })
    this.writeFile(listaUpdated);
  }

  async deleteProduct(id){
    const productos = await this.getProducts();
    const filtro = productos.filter((prod)=>(id !== prod.id));
    await this.writeFile(filtro);
    console.log('Producto eliminado exitosamente.');
  }
}

module.exports = ProductManager;


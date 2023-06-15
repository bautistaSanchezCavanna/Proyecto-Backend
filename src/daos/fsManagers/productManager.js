import { readFile as _readFile, writeFile as _writeFile } from "fs/promises";
import { existsSync } from 'fs';

class ProductManager {
  static contadorId = 0;

  constructor(path) {
    this.path = path;
  }

  async readFile(){
    const archivo = await _readFile(this.path, "utf-8");
    const productos = JSON.parse(archivo);
    return productos;
  }

  async writeFile(data){
    const string = JSON.stringify(data, null, '\t');
    await _writeFile(this.path, string);
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
      products.push(product);
      await this.writeFile(products);
      return product; 
    }
  }

  async getProductById(id) {
    const productos = await this.getProducts();
    const filtrado = productos.find((prod) => prod.id === id);
    return filtrado;
  
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
    await this.writeFile(listaUpdated);
    return prodUpdated;
  }

  async deleteProduct(id){
    const productos = await this.getProducts();
    const filtro = productos.filter((prod)=>(id !== prod.id));
    await this.writeFile(filtro);
  }

}

export default ProductManager;
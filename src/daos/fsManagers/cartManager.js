import { readFile as _readFile, writeFile as _writeFile } from "fs/promises";
import { existsSync } from 'fs';
import productManager from "./productManager.js";
const pManager = new productManager("./src/data/products.json");


export default class CartManager {
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

 async getCarts() {
    if (existsSync(this.path)) {
      return await this.readFile();
    } else {
      return [];
    }
  }

  async addCart(){
    const carts = await this.getCarts();
    if(carts.length === 0){
      CartManager.contadorId = 1;
    }else {
      CartManager.contadorId = carts[carts.length - 1].id + 1;
    }
    const newCart = {id: CartManager.contadorId, products:[]};
    carts.push(newCart);
    await this.writeFile(carts);
    return newCart;
  }

  async addToCart(cid, pid){
        const productos = await pManager.getProducts();
        const carts = await this.getCarts();
        const product = productos.find(prod => prod.id === +pid);
        const cart = carts.find(item => item.id === +cid);
        
        const productIndex = cart.products.findIndex(item => item.productId === +pid);     
         if(productIndex < 0){
            cart.products.push({productId: product.id, quantity: 1});
        }else{
            const existingProd = cart.products[productIndex];
            existingProd.quantity++;
            cart.products[productIndex] = existingProd;
        } 
        await this.writeFile(carts);
        return cart;
  }

}


<<<<<<< HEAD
import { HTTP_STATUS } from "../constants/constants.js";
import CartsDAO from "../daos/mongoManagers/carts.manager.js";
import ProductsDAO from "../daos/mongoManagers/products.manager.js";
import { HttpError } from "../utils/error.utils.js";


export default class CartsService {
  static async getCarts() {
    try {
      const carts = await CartsDAO.getCarts();
      if(!carts){
        return new HttpError('Carts not found', HTTP_STATUS.NOT_FOUND)
      }
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCartById(cid) {
    try {
      const cart = await CartsDAO.getCartById(cid);
      if (!cart) {
        return new HttpError("Cart not found", HTTP_STATUS.NOT_FOUND);
      } 
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createCart() {
    try {
      return await CartsDAO.createCart();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addToCart(cid, pid) {
    try {
        const product = await ProductsDAO.getProductById(pid);
        const cart = await CartsDAO.getCartById(cid);
      if (!cart) {
        return new HttpError("Cart not found", HTTP_STATUS.NOT_FOUND);
      }
      if (!product) {
        return new HttpError("Product not found", HTTP_STATUS.NOT_FOUND);
      }
      const productIndex = cart.products.findIndex((product) => product.product._id == pid);
      return await CartsDAO.addToCart(cid, pid, productIndex);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteProduct(cid, pid) {
    try {
      if (!cid) {
        return new HttpError("Cart not found", HTTP_STATUS.NOT_FOUND);
      }
      if (!pid) {
        return new HttpError("Product not found", HTTP_STATUS.NOT_FOUND);
      }
      return await CartsDAO.deleteProduct(cid, pid);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateCart(cid, pid, payload) {
    try {
      if (!cid) {
        return new HttpError("Cart not found", HTTP_STATUS.NOT_FOUND);
      }
      if (!pid) {
        return new HttpError("Product not found", HTTP_STATUS.NOT_FOUND);
      }
      return await CartsDAO.updateCart(cid, pid, payload);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async cleanCart(cid) {
    try {
      if (!cid) {
        return new HttpError("Cart not found", HTTP_STATUS.NOT_FOUND);
      }
      return await CartsDAO.cleanCart(cid);
      } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteCart(cid) {
    try {
      if (!cid) {
        return new HttpError("Cart not found", HTTP_STATUS.NOT_FOUND);
      }
      return await CartsDAO.deleteCart(cid);
      } catch (error) {
      throw new Error(error.message);
    }
  }

 static async purchaseCart(cid, user){
    try {
      /* if (!user) {
        return new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
      }   */
      const cart = await CartsDAO.getCartById(cid);
      if (!cart) {
        return new HttpError("Cart not found", HTTP_STATUS.NOT_FOUND);
      }
      let totalPrice = 0;
      const productsToRemove = [];
        for(const product of cart.products){
          const productData = await ProductsDAO.getProductById(product.product);
          if(productData.stock >= product.quantity){
            await ProductsDAO.updateProduct(product.product, {stock: productData.stock - product.quantity});
            productsToRemove.push(product.product);
            totalPrice += productData.price * product.quantity;
          } else{
            //return new HttpError(`No se puede completar la compra del producto: "${productData.title}" porque no hay stock suficiente. Unidades restantes: ${productData.stock}`);
            console.log(`No se puede completar la compra del producto: "${productData.title}" porque no hay stock suficiente. Unidades restantes: ${productData.stock}`);
          } 
        }  
        console.log(productsToRemove);
        for (const product of productsToRemove) {
          await CartsDAO.deleteProduct(cid, product);
        }

        if(totalPrice > 0){
      const date = new Date();
      const data = {
        date,
        email: 'user.email :)',
        totalPrice 
      }
        return await CartsDAO.purchaseCart(data);
      } 

    } catch (error) {
      throw new Error(error.message);
    }
  }

}
=======
import CartsDAO from "../daos/mongoManagers/carts.manager.js";
import ProductsDAO from "../daos/mongoManagers/products.manager.js";

export default class CartsService {
  static async getCarts() {
    try {
      const carts = await CartsDAO.getCarts();
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCartById(cid) {
    try {
      if (!cid) console.log("Cart ID not valid");
      const cart = await CartsDAO.getCartById(cid);
      if (!cart) console.log("Cart not found");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createCart() {
    try {
      const createdCart = await CartsDAO.createCart();
      return createdCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addToCart(cid, pid) {
    try {
        const product = await ProductsDAO.getProductById(pid);
        const cart = await CartsDAO.getCartById(cid);
      if (!cart) {
        return console.log("Cart not found");
      }
      if (!product) {
        return console.log("Product not found");
      }
      const productIndex = cart.products.findIndex((product) => product.product._id == pid);
      return await CartsDAO.addToCart(cid, pid, productIndex);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteProduct(cid, pid) {
    try {
      if (!cid) {
        return console.log("Cart not found");
      }
      if (!pid) {
        return console.log("Product not found");
      }
      const cartUpdated = await CartsDAO.deleteProduct(cid, pid);
      return cartUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateCart(cid, pid, payload) {
    try {
      if (!cid) {
        return console.log("Cart not found");
      }
      if (!pid) {
        return console.log("Product not found");
      }
      return await CartsDAO.updateCart(cid, pid, payload);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async cleanCart(cid) {
    try {
      if (!cid) {
        return console.log("Cart not found");
      }
      return await CartsDAO.cleanCart(cid);
      } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteCart(cid) {
    try {
      if (!cid) {
        return console.log("Cart not found");
      }
      return await CartsDAO.deleteCart(cid);
      } catch (error) {
      throw new Error(error.message);
    }
  }

  static async purchaseCart(cid, user){
    try {
      if (!cid) {
        return console.log("Cart not found");
      }
      if (!user) {
        return console.log("User not found");
      }
      const ticket = await CartsDAO.purchaseCart(cid, user)
      return ticket;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
>>>>>>> origin/main

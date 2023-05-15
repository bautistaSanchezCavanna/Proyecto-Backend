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

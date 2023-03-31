import {cartsModel} from "../models/carts.model.js";

export default class CManager {
  async getCarts() {
    return await cartsModel.find();
  }

  async getCartById(cid) {
    return await cartsModel.findOne({_id: cid}).populate("products");
  }

  async addCart() {
    return await cartsModel.create({});
  }

  async addToCart(cid, pid) {
    let cart = await cartsModel.findOne({ _id: cid });
    const productIndex = cart.products.findIndex(
      (product) => product.product._id == pid
    );
    if (productIndex < 0) {
      return await cartsModel.findOneAndUpdate(
        { _id: cid },
        { $push: { products: { product: { _id: pid }, quantity: 1 } } }
      );
    } else {
      const existingProd = cart.products[productIndex];
      let quantity = existingProd.quantity++;
      cart.products[productIndex] = existingProd;
      return await cartsModel.findOneAndUpdate(
        { _id: cid },
        { products: { product: { _id: pid }, quantity: quantity + 1 } },
        { new: true }
      );
    }
  }

  async deleteProduct(cid, pid) {
    return await cartsModel.findOneAndUpdate(
      { _id: cid },
      { $pull: { products: { _id: pid } } }
    );
  }

  async updateQuantity(cid, pid, update) {
    return await cartsModel.findOneAndUpdate(
      { _id: cid },
      { products: { _id: pid, update } },
      { new: true }
    );
  }

  async cleanCart(cid) {
    return await cartsModel.findOneAndUpdate(
      cid,
      { products: [] },
      { new: true }
    );
  }
}



import { cartsModel } from "../schemas/carts.schema.js";
import { ticketsModel } from "../schemas/tickets.schemas.js";

export default class CartsDAO {
  static async getCarts() {
    return await cartsModel.find();
  }

  static async getCartById(cid) {
    return await cartsModel.findOne({ _id: cid }).populate("products");
  }

  static async createCart() {
    return await cartsModel.create({});
  }

   static async addToCart(cid, pid, productIndex) {
    if (productIndex < 0) {
      return await cartsModel.findOneAndUpdate({ _id: cid }, { $push: { products: { product: { _id: pid }, quantity: 1 }}});
    }else {
      return await cartsModel.findOneAndUpdate({ _id: cid, "products.product": pid },{ $inc: { "products.$.quantity": 1 } },{ new: true });
    } 
  } 

  static async deleteProduct(cid, pid) {
    return await cartsModel.findOneAndUpdate({ _id: cid }, { $pull: { products: {product: { _id: pid }}}});
  }

  static async cleanCart(cid) {
    return await cartsModel.findOneAndUpdate({ _id: cid }, { products: [] }, { new: true });
  } 

  static async deleteCart(cid) {
    await cartsModel.findOneAndDelete({_id:cid});
    return await cartsModel.find();
  }

  static async purchaseCart(data){
    const ticket = await ticketsModel.create({
      code: data.code,
      purchase_datetime: data.date,
      amount: data.totalPrice,
      purchaser: data.email || data.githubLogin
    })
    return ticket;
  }
  
}

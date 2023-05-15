import CartsDAO from "../daos/mongoManagers/carts.manager.js";
import CartsService from "../services/carts.service.js";

export default class CartsController {

  static async getCarts(req, res, next) {
    try {
      const carts = await CartsService.getCarts();
      return res.sendSuccess(carts);
    } catch (error) {
      next(error);
    }
  }

  static async getCartById(req, res, next) {
    const cid = req.params.cid;
    try {
      const cart = await CartsService.getCartById(cid);
      return res.sendSuccess(cart);
    } catch (error) {
      next(error);
    }
  }

  static async createCart(req, res, next) {
    try {
      const cart = await CartsService.createCart();
      return res.sendSuccess(cart);
    } catch (error) {
      next(error);
    }
  }

  static async addToCart(req, res, next) {
    const { cid, pid } = req.params;
    try {
      await CartsService.addToCart(cid, pid);
      return res.sendSuccess('Product added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const { cid, pid } = req.params;
    try {
      const deleted = await CartsService.deleteProduct(cid, pid);
      return res.sendSuccess(deleted);
    } catch (error) {
      next(error);
    }
  }

  static async updateCart(req, res, next) {
    const payload = req.body;
    const { cid, pid } = req.params;
    try {
      const modifiedCart = await CartsService.updateCart(cid, pid, payload);
      return res.sendSuccess(modifiedCart);
    } catch (error) {
      next(error);
    }
  }

  static async cleanCart(req, res, next) {
    const {cid} = req.params;
    try {
      const cleanedCart = await CartsService.cleanCart(cid);
      return res.sendSuccess(cleanedCart);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req, res, next) {
    const {cid} = req.params;
    try {
      const erasedCart = await CartsService.deleteCart(cid);
      return res.sendSuccess(erasedCart);
    } catch (error) {
      next(error);
    }
  }

  static async purchaseCart(req, res, next){
    const {cid} = req.params;
    const user = req.user;
    try {
      const ticket = await CartsService.purchaseCart(cid, user);
      console.log(ticket);
      return res.sendSuccess(ticket)
    } catch (error) {
      next(error);
    }
  }
}

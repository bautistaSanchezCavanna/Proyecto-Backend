import CartsDAO from "../daos/mongoManagers/carts.manager.js";
import CartsService from "../services/carts.service.js";

export default class CartsController {

  static async getCarts(req, res, next) {
    try {
      const carts = await CartsService.getCarts();
      return res.status(200).json(carts);
    } catch (error) {
      next(error);
    }
  }

  static async getCartById(req, res, next) {
    const cid = req.params.cid;
    try {
      const cart = await CartsService.getCartById(cid);
      return res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async createCart(req, res, next) {
    try {
      const cart = await CartsService.createCart();
      return res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async addToCart(req, res, next) {
    const { cid, pid } = req.params;
    try {
      const addedProduct = CartsService.addToCart(cid, pid)
      return res.status(200).json({status: 'OK', data: 'Product added successfully'});
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const { cid, pid } = req.params;
    try {
      const deleted = await CartsService.deleteProduct(cid, pid);
      return res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  }

  static async updateCart(req, res, next) {
    const payload = req.body;
    const { cid, pid } = req.params;
    try {
      const modifiedCart = await CartsService.updateCart(cid, pid, payload);
      return res.status(200).json(modifiedCart);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req, res, next) {
    const {cid} = req.params;
    try {
      const cleanedCart = await CartsService.deleteCart(cid);
      return res.status(200).json(cleanedCart);
    } catch (error) {
      next(error);
    }
  }
}

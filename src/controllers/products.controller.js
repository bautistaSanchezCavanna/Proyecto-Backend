import { ProductsService } from "../services/products.service.js";

export default class ProductsController {
  
  static async getProducts(req, res, next) {
    const { limit, sort } = req.query;
    try {
      const response = await ProductsService.getProducts(limit, sort);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    const productPayload = req.body;
    try {
      const response = await ProductsService.createProduct(productPayload);
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    const pid = req.params.pid;
    try {
      const response = await ProductsService.getProductById(pid);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async getPaginate(req, res, next) {
    try {
      const response = await ProductsService.getPaginate();
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    const pid = req.params.pid;
    const payload = req.body;
    try {
      const response = await ProductsService.updateProduct(pid, payload);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const pid = req.params.pid;
    try {
      const response = await ProductsService.deleteProduct(pid);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }
}

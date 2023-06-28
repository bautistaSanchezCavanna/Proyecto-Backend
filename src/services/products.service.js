import shortid from "shortid";
import { HTTP_STATUS } from "../constants/constants.js";
import ProductsDAO from "../daos/mongoManagers/products.manager.js";
import { HttpError } from "../utils/error.utils.js";

export class ProductsService {
  static async getProducts(limit, sort) {
    try {
      const products = await ProductsDAO.getProducts(limit, sort);
      if(!products){
        return new HttpError("Products not found", HTTP_STATUS.NOT_FOUND);
      }
      if (!limit) {
        return products.splice(0, 10);
      }
      if (!sort) {
        return await ProductsDAO.getProducts(null, null);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createProduct(payload) {
    try {
        const code = shortid.generate();
        const newProduct = {...payload, code}
        const addedProduct = await ProductsDAO.createProduct(newProduct);
        return addedProduct
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getProductById(pid) {
    try {
        const product = await ProductsDAO.getProductById(pid);
        if(!product){
          return new HttpError('Product not found', HTTP_STATUS.NOT_FOUND);
        }
        return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getPaginate(filter, limit, page) {
    try {
      const products = await ProductsDAO.getPaginate(filter, limit, page);
      if(!products){
        return new HttpError("Products not found", HTTP_STATUS.NOT_FOUND);
      }
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateProduct(pid, payload) {
    try {
        if(!pid){
            return new HttpError('Product not found', HTTP_STATUS.NOT_FOUND);
        }
        const updatedProduct = await ProductsDAO.updateProduct(pid, payload);
        return updatedProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteProduct(pid) {
    try {
        if(!pid){
            return new HttpError('Product not found', HTTP_STATUS.NOT_FOUND);
        }
        const productDeleted = await ProductsDAO.deleteProduct(pid);
        return productDeleted;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

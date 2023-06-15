<<<<<<< HEAD
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
        const addedProduct = await ProductsDAO.createProduct(payload);
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

  static async getPaginate() {
    try {
      const products = await ProductsDAO.getPaginate();
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
        await ProductsDAO.deleteProduct(pid);
        const updatedList = await ProductsDAO.getProducts();
        return updatedList;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
=======
import ProductsDAO from "../daos/mongoManagers/products.manager.js";

export class ProductsService {

  static async getProducts(limit, sort) {
    try {
      if (!limit) {
        const products = await ProductsDAO.getProducts(limit, sort);
        const limitado = products.splice(0, 10);
        return limitado;
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
        const addedProduct = await ProductsDAO.createProduct(payload);
        return addedProduct
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getProductById(pid) {
    try {
        if(!pid){
           return console.log('Product ID not valid');
        }
        const product = await ProductsDAO.getProductById(pid);
        if(!product)console.log('Product not found');
        return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getPaginate() {
    try {
      const products = await ProductsDAO.getPaginate();
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateProduct(pid, payload) {
    try {
        if(!pid){
            return console.log('Product not found');
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
            return console.log('Product not found');
        }
        await ProductsDAO.deleteProduct(pid);
        const updatedList = await ProductsDAO.getProducts();
        return updatedList;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
>>>>>>> origin/main

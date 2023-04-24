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

const productModel = require('../models/product.model.js');

class PManager{

  async getProducts(){
    return await productModel.find();
  }  

  async addProduct(data){
    return await productModel.create(data);
  }

  async getProductById(id){
    return await productModel.findOne({_id: id});
  }

  async updateProduct(id, data){
    return await productModel.findOneAndUpdate(id, data, {new:true});
  }

  async deleteProduct(id){
    return await productModel.findOneAndDelete({_id:id});
  }
  }

module.exports = PManager;
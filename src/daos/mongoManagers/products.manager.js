const productModel = require('../models/product.model.js');

class PManager{

  async getProducts(num, sort){
    if(sort){
        return await productModel.find().limit(num).sort({price:sort});
    }
    return await productModel.find().limit(num);
  }  

  async getPaginate(){
    const products = await productModel.paginate({category: 'cualquiera'},{limit:2, page:1});
    return products;
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
import {productModel} from '../schemas/product.schema.js';

export default class ProductsDAO {

  static async getProducts(num, sort){
    if(sort){
        return await productModel.find().limit(num).sort({price:sort});
    }
    return await productModel.find().limit(num);
  }  

  static async getPaginate(){
    return await productModel.paginate({category: 'cualquiera'},{limit:2, page:1});
  }

  static async createProduct(data){
    return await productModel.create(data);
  }

  static async getProductById(id){
    return await productModel.findOne({_id: id});
  }

  static async updateProduct(id, data){
    return await productModel.findOneAndUpdate(id, data, {new:true});
  }

  static async deleteProduct(id){
    return await productModel.findOneAndDelete({_id:id});
  }
  }

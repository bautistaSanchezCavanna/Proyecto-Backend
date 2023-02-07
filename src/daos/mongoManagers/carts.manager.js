const cartsModel = require('../models/carts.model.js');
const productModel = require('../models/product.model.js');

class CManager{

    async getCarts(){
        return await cartsModel.find();
    }

    async getCartById(cid){
        return await cartsModel.findOne({_id:cid})/* .populate("products"); */
    }

    async addCart(){
        return await cartsModel.create({});
    }

    async addToCart(cid, pid){
        const cart = await cartsModel.findOne({_id:cid});
        const productIndex = cart.products.findIndex(item => item._id === pid);  
         if(productIndex){
            return await cartsModel.findOneAndUpdate({_id:cid}, {$push:{products:{_id:pid, quantity:1}}});
        }else{
            const existingProd = cart.products[productIndex];
            let quantity = existingProd.quantity++;
            cart.products[productIndex] = existingProd;
           return await cartsModel.findOneAndUpdate({_id:cid}, {products:{_id:pid, quantity: quantity + 1}}, {new:true});

        }
    }

    async deleteProduct(cid, pid){
        return await cartsModel.findOneAndUpdate({_id:cid}, {$pull:{products:{_id:pid}}});
    }

    async updateQuantity(cid, pid, update){
        return await cartsModel.findOneAndUpdate({_id:cid}, {products:{_id:pid, update}}, {new:true});
    }

    async cleanCart(cid){
        return await cartsModel.findOneAndUpdate(cid, {products:[]}, {new:true});
    }
}

module.exports = CManager;
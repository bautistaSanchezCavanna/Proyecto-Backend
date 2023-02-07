const mongoose = require('mongoose');
//const productsCollection = require('./product.model.js');
const cartsCollection = 'carts';



const cartsSchema = mongoose.Schema({
    products:{type:[
        {
            //{type: mongoose.Schema.Types.ObjectId, ref: "products"}
        _id:{type: String},
        quantity:{type:Number} 
        }
    ]}
})


const cartsModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartsModel;

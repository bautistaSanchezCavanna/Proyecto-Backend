const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true,
        unique: true
    },
    stock:{
        type: Number,
        required: true,
    }
})

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

module.exports = productModel;

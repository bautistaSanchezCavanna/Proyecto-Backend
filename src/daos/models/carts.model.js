const mongoose = require("mongoose");
//const productsCollection = require('./product.model.js');
const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
        //{type: mongoose.Schema.Types.ObjectId, ref: "products"}

        products: {
          type: [
            {
              product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
              },
              quantity: { type: Number, default: 1, required: true },
            },
          ],
          default: [],
          required: true,
        }

        /* _id:{type: String},
        quantity:{type:Number}  */
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartsModel;

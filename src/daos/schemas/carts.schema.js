import mongoose from "mongoose";
const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
        products: {
          type: [
            {
              product: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'products'
              },
              quantity: { type: Number, default: 1, required: true },
            },
          ],
          default: [],
          required: true,
        }
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);


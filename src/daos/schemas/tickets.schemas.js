import mongoose from "mongoose";
const ticketsCollection = "tickets";

const ticketsSchema = new mongoose.Schema({
        code: { type: String, unique: true },
        purchase_datetime: { type: Date },
        amount:{type: Number},
        purchaser: {type: String},
})

export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

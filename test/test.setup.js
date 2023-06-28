import mongoose from "mongoose";
import {userModel} from "../src/daos/schemas/users.schema.js";
import {productModel} from "../src/daos/schemas/product.schema.js";
import {cartsModel} from "../src/daos/schemas/carts.schema.js";
import { ticketsModel } from "../src/daos/schemas/tickets.schemas.js";
import supertest from "supertest";

export const requester = supertest("http://localhost:8080");

mongoose.set('strictQuery', true);
before(async ()=>{
    await mongoose.connect("mongodb+srv://bsanchezcavanna:lJkVJFQEsEcyKtOh@codercluster.sukhsuw.mongodb.net/ecommerceTesting?retryWrites=true&w=majority")
});

after(async ()=>{
    mongoose.connection.close();
});

export const dropUsers = async ()=>{
    await userModel.collection.deleteMany();
}

export const dropProducts = async ()=>{
    await productModel.collection.deleteMany();
}

export const dropCarts = async ()=>{
    await cartsModel.collection.deleteMany();
}

export const dropTickets = async ()=>{
    await ticketsModel.collection.deleteMany();
}
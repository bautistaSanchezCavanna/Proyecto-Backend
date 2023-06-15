import { Router } from "express";
const router = Router();
import ProductManager from "../../daos/fsManagers/productManager.js";
const fsPManager = new ProductManager("./src/data/products.json");
import ProductsDAO from "../../daos/mongoManagers/products.manager.js";
const productService = new ProductsDAO();
import CManager from "../../daos/mongoManagers/carts.manager.js";
const cartService = new CManager();
import MongoStore from "connect-mongo";

import session from "express-session";
import ViewsController from "../../controllers/views.controller.js";
import CustomRouter from "../customRouter.js";

router.use(
  session({
    name: "session1",
    secret: "elefante",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://bsanchezcavanna:lJkVJFQEsEcyKtOh@codercluster.sukhsuw.mongodb.net/dataSessions?retryWrites=true&w=majority",
    }),
  })
);

export class ViewsRouter extends CustomRouter {

  init() {
    this.get("/products", ["USER", "ADMIN"], ViewsController.productsView);

    this.get("/carts/:cid", ["USER", "ADMIN"], ViewsController.cartByIdView);

    this.get("/", ["PUBLIC"], ViewsController.loginView);

    this.get("/register", ["PUBLIC"], ViewsController.registerView);

    this.get("/logout", ["USER", "ADMIN"], ViewsController.logoutView);
  } 
};


export default new ViewsRouter();
<<<<<<< HEAD
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
=======
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
    /* router.get("/home", async (req, res) => {
      const products = await fsPManager.getProducts();
      const data = {
        title: "Home",
        info: products,
      };
      res.render("home", data);
    });

    router.get("/realTimeProducts", async (req, res) => {
      const products = await fsPManager.getProducts();
      const data = {
        title: "Real Time Products",
        info: products,
        style: "/styles/realTimeProducts.css",
      };
      res.render("realTimeProducts", data);
    });

    router.get("/sessionProducts", async (req, res) => {
      await req.session.user;
      if (req.session.user) {
        const name = req.session?.user.first_name;
        let rol;
        req.session.isAdmin ? (rol = "Admin") : (rol = "User");
        const products = await productService.getProducts();
        const data = {
          title: "Products",
          info: products,
          user: { name, rol },
        };
        res.render("products", data);
      } else {
        console.log("quak");
        res.redirect("/");
      }
    }); */

    this.get("/products", ["USER", "ADMIN"], ViewsController.productsView);

    this.get("/carts/:cid", ["USER", "ADMIN"], ViewsController.cartByIdView);

    this.get("/", ["PUBLIC"], ViewsController.loginView);

    this.get("/register", ["PUBLIC"], ViewsController.registerView);

    this.get("/logout", ["USER", "ADMIN"], ViewsController.logoutView);
  } 
};


export default new ViewsRouter();
>>>>>>> origin/main

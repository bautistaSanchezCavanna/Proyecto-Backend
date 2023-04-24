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

const process = () => {
  try {
    router.get("/home", async (req, res) => {
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
    });

    router.get("/products", ViewsController.productsView);

    router.get("/carts/:cid", ViewsController.cartByIdView);

    router.get("/", ViewsController.loginView);

    router.get("/register", ViewsController.registerView);

    router.get("/logout", ViewsController.logoutView);
  } catch (error) {
    throw new Error(error.message);
  }
};

process();

export default router;

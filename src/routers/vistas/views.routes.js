import { Router } from "express";
const router = Router();
import ProductManager from "../../daos/fsManagers/productManager.js";
const fsPManager = new ProductManager("./src/data/products.json");
import PManager from "../../daos/mongoManagers/products.manager.js";
const productService = new PManager();
import CManager from "../../daos/mongoManagers/carts.manager.js";
const cartService = new CManager();
import MongoStore from "connect-mongo";

import session from "express-session";

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

const fileProcess = () => {
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

    router.get("/products", async (req, res) => {
      const products = await productService.getProducts();
      const data = {
        title: "Products",
        products,
      };
      res.render("products", data);
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

    router.get("/carts/:cid", async (req, res) => {
      const cid = req.params.cid;
      const cart = await cartService.getCartById(cid);
      const data = {
        title: "Carrito",
        info: cart.products,
        cid: cid,
      };

      res.render("carts", data);
    });

    router.get("/", async (req, res) => {
      const data = { title: "Login" };
      res.render("login", data);
    });

    router.get("/register", async (req, res) => {
      const data = { title: "Sign Up" };
      res.render("register", data);
    });

    router.get("/logout", async (req, res) => {
      res.clearCookie('cookieToken');
      const html = '<h1>Logout successfull</h1><a href="/">LogIn again</a>';
      res.send(html);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

fileProcess();

export default router;

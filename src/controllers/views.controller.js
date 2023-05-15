import CartsDAO from "../daos/mongoManagers/carts.manager.js";
import ProductsDAO from "../daos/mongoManagers/products.manager.js";
import UsersDAO from "../daos/mongoManagers/users.manager.js";

export default class ViewsController {
  static async productsView(req, res, next) {
    try {
      const products = await ProductsDAO.getProducts();
      const data = {
        title: "Products",
        products,
        user: req.user,
      };
      return res.render("products", data);
    } catch (error) {
      next(error);
    }
  }

  static async cartByIdView(req, res, next) {
    try {
      const cid = req.params.cid;
      const cart = await CartsDAO.getCartById(cid);
      const data = {
        title: "Carrito",
        cartProducts: cart.products,
        cid: cid,
      };

      return res.render("carts", data);
    } catch (error) {
      next(error);
    }
  }

  static async loginView(req, res, next) {
    try {
      const data = { title: "Login" };
      return res.render("login", data);
    } catch (error) {
      next(error);
    }
  }

  static async registerView(req, res, next) {
    try {
      const data = { title: "Sign Up" };
      res.render("register", data);
    } catch (error) {
      next(error);
    }
  }

  static async logoutView(req, res, next) {
    try {
      res.clearCookie("cookieToken");
      const html = '<h1>Logout successfull</h1><a href="/">LogIn again</a>';
      res.send(html);
    } catch (error) {
      next(error);
    }
  }
}

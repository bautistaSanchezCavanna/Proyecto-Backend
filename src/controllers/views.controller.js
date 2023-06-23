import ENV from "../config/env.config.js";
import CartsDAO from "../daos/mongoManagers/carts.manager.js";
import ProductsDAO from "../daos/mongoManagers/products.manager.js";
import { ticketsModel } from "../daos/schemas/tickets.schemas.js";
import { UsersService } from "../services/users.service.js";

export default class ViewsController {
  static async productsView(req, res, next) {
    try {
      const products = await ProductsDAO.getProducts();
      const user = req.user._doc || req.user;  
      let username = req.user.first_name || req.user.githubLogin || req.user._doc.githubLogin;
      let access = {};
      if (user.role === "ADMIN"){
        access = {ruta:'/users', texto: 'Ir a users' };
      }
      
      const data = {
        title: "Products",
        products,
        user,
        username,
        access,
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
      let visibility = "hidden";
      if(cart.products.length > 0){
        visibility = "visible";
      }
      const data = {
        title: "Carrito",
        cartProducts: cart.products,
        cid,
        visibility
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

  static async ticketView(req, res, next) {
    const tid = req.cookies.ticketID;
    try {
      const ticket = await ticketsModel.findOne({ _id: tid });
      const data = {
        title: "Ticket",
        code: ticket.code,
        date: ticket.purchase_datetime,
        amount: ticket.amount,
        purchaser: ticket.purchaser,
      };
      res.render("ticket", data);
    } catch (error) {
      next(error);
    }
  }

  static async usersView(req, res, next){
    try {
      const users = await UsersService.getUsers();
      
      const data = {
        title: "Usuarios",
        users
      }
      res.render("users", data);
    } catch (error) {
      next(error);
    }
  }

  static async logoutView(req, res, next) {
    try {
      const cookiesToDelete = [ENV.SESSION_KEY, ENV.TICKET_KEY];
      cookiesToDelete.forEach(cookieName => {
        res.clearCookie(cookieName);
      });
      const html = '<h1>Logout successfull</h1><a href="/">LogIn again</a>';
      res.send(html);
    } catch (error) {
      next(error);
    }
  }
}
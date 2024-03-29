import ViewsController from "../../controllers/views.controller.js";
import CustomRouter from "../customRouter.js";

export class ViewsRouter extends CustomRouter {
  init() {
    this.get("/home", ["USER", "ADMIN"], ViewsController.homeView)

    this.get("/products", ["USER", "ADMIN"], ViewsController.productsView);

    this.get("/manageProducts", ["ADMIN"], ViewsController.manageProductsView)

    this.get("/carts/:cid", ["USER", "ADMIN"], ViewsController.cartByIdView);

    this.get("/", ["PUBLIC"], ViewsController.loginView);

    this.get("/register", ["PUBLIC"], ViewsController.registerView);
    
    this.get("/ticket", ["USER", "ADMIN"], ViewsController.ticketView);

    this.get("/users", ["ADMIN"], ViewsController.usersView);

    this.get("/logout", ["USER", "ADMIN"], ViewsController.logoutView);
  } 
};


export default new ViewsRouter();

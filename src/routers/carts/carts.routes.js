import CartsController from "../../controllers/carts.controller.js";
import CustomRouter from "../customRouter.js";

export class CartsRouter extends CustomRouter {
  init() {
    this.get("/", ["PUBLIC"], CartsController.getCarts);

    this.get("/:cid", ["PUBLIC"], CartsController.getCartById);

    this.post("/", ["PUBLIC"], CartsController.createCart);

    this.post("/:cid/product/:pid", ["PUBLIC"], CartsController.addToCart);

    this.delete( "/:cid/product/:pid", ["PUBLIC"], CartsController.deleteProduct);

    this.put("/:cid/product/:pid", ["PUBLIC"], CartsController.updateCart);

    this.delete("/:cid", ["PUBLIC"], CartsController.deleteCart);
  }
}

export default new CartsRouter();
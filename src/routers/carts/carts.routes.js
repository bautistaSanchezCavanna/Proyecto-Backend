import CartsController from "../../controllers/carts.controller.js";
import CustomRouter from "../customRouter.js";

export class CartsRouter extends CustomRouter {
  init() {
    this.get("/", ["ADMIN"], CartsController.getCarts);

    this.get("/:cid", ["ADMIN"], CartsController.getCartById);

    this.post("/", ["ADMIN"], CartsController.createCart);

    this.post("/:cid/product/:pid", ["USER"], CartsController.addToCart);

    this.post("/:cid/purchase", ["USER"], CartsController.purchaseCart);

    this.delete( "/:cid/product/:pid", ["USER", "ADMIN"], CartsController.deleteProduct);

    this.put("/:cid/product/:pid", ["ADMIN"], CartsController.updateCart);

    this.put("/:cid/clean", ["USER", "ADMIN"], CartsController.cleanCart);

    this.delete("/:cid", ["ADMIN"], CartsController.deleteCart);
  }
}

export default new CartsRouter();
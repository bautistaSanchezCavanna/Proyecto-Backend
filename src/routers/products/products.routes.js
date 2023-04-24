import ProductsController from "../../controllers/products.controller.js";
import CustomRouter from "../customRouter.js";
  
  export class ProductsRouter extends CustomRouter {
    init() {
    this.get('/', ["PUBLIC"], ProductsController.getProducts);
     
    this.get('/paginate', ["PUBLIC"], ProductsController.getPaginate)

    this.post("/", ["ADMIN"], ProductsController.createProduct);

    this.get("/:pid", ["ADMIN"], ProductsController.getProductById);

    this.put("/:pid", ["ADMIN"], ProductsController.updateProduct);

    this.delete("/:pid", ["ADMIN"], ProductsController.deleteProduct);
    
  } 
};

export default new ProductsRouter();


const { Router } = require("express");
const router = Router();
const ProductManager = require("../../manejos/manejo");
const manager = new ProductManager("./src/data/carts.json");

const fileProcess = async () => {
  let contadorId = 0;

  try {
    router.get("/", async (req, res) => {
      const carts = await manager.getProducts();
      res.json({
        status: "Success",
        data: carts,
      });
    });

    router.get("/:cid", async (req, res) => {
      const carts = await manager.getProducts();
      const cid = req.params.cid;
      const cart = carts.find((cart) => cart.id === +cid);
      if (!cart) {
        res.status(404).json({
          status: "error",
          error: "Cart Not Found",
        });
      }
      res.json({
        status: "Success",
        data: cart,
      });
    });

    router.post("/", async (req, res) => {
      const carts = await manager.getProducts();

      if (carts.length === 0) {
        return (contadorId = 1);
      } else {
        contadorId = carts[carts.length - 1].id + 1;
      }
      const productAdded = [{id:1, quantity:4}];
      const cart = { id: contadorId, products: productAdded};
      carts.push(cart);
      manager.writeFile(carts);
      res.json({
        status: "Success",
        data: cart,
      });
    });

    router.post("/:cid/product/:pid", async (req, res) => {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const carts = await manager.getProducts();
      let cart = carts.find((cart) => cart.id === +cid);
      if (!cart) {
        res.status(404).json({
          status: "error",
          error: "Cart Not Found",
        });
      }
      let products = cart.products;
      let product = products.find((prod) => prod.id === +pid);
      console.log('cart=>', cart)
      console.log('product=>', product);
      let quantity = product.quantity;
      if (!product) {
        res.status(404).json({
          status: "error",
          error: "Product Not Found",
        });
      }
      const add = {quantity: quantity + 1}
      const productUpdate = {...product, ...add};
      product = productUpdate;

        let cartUpdated = products.map(item=>{
        if(item.id === productUpdate.id){
            return productUpdate;
        }else{
            return item;
        }
      });  

      let cartUpdate = {id: +cid, products: [cartUpdated]};
      cart = cartUpdate;
      
      res.json({
        status: "success",
        data: { cart },
      });
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

fileProcess();


module.exports = router;

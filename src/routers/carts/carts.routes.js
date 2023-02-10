const { Router } = require("express");
const cartsModel = require("../../daos/models/carts.model.js");
const router = Router();
const cartManager = require("../../daos/mongoManagers/carts.manager.js");
const CManager = new cartManager("./src/data/carts.json");
const productManager = require('../../daos/mongoManagers/products.manager.js')
const PManager = new productManager();


const requestsProcess = async () => {

  try {
    router.get("/", async (req, res) => {
      const carts = await CManager.getCarts();
      res.json({
        status: "Success",
        data: carts,
      });
    });

    router.get("/:cid", async (req, res) => {
      const cid = req.params.cid;
      const cart = await CManager.getCartById(cid);
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
      const addCart = await CManager.addCart();
      res.json({
        status: "Success",
        data: addCart,
      });
    });

    router.post('/:cid/product/:pid', async (req, res)=>{
        const { cid, pid } = req.params;
        if(!cid){
            res.send('Carrito inexistente')
        }
    
        if(!pid){
            res.send('Producto inexistente');
        }
        const addProduct = await CManager.addToCart(cid, pid);
        res.json({
           status:"Success",
           data: addProduct 
        })
    })

    router.delete('/:cid/product/:pid', async (req, res)=>{
      const { cid, pid } = req.params;
      const deleted = await CManager.deleteProduct(cid, pid);
      res.json({
        status:"Product deleted successfully from cart",
        data: deleted 
     })
    })

    router.put('/:cid/product/:pid', async (req, res)=>{
      const update = req.body;
      const {cid, pid} = req.params;
      console.log(update);
      const modified = await CManager.updateQuantity(cid, pid, update);
      res.json({
        status:"Product updated successfully",
        data: modified 
      })
    })

    router.delete('/:cid', async (req, res)=>{
      const cid = req.params;
      const clean = await CManager.cleanCart(cid);
      res.json({
        status:'Cart cleaned',
        data: clean
      })
    })
  } catch (error) {
    throw new Error(error.message);
  } 
};

requestsProcess();


module.exports = router;

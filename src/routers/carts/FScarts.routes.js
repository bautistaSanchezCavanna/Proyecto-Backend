<<<<<<< HEAD
import { Router } from "express";
const router = Router();
import cartManager from "../../daos/fsManagers/cartManager.js";
const manager = new cartManager("./src/data/carts.json");
import productManager from "../../daos/fsManagers/productManager.js";
const pManager = new productManager("./src/data/products.json");

const fileProcess = async () => {

  try {
    router.get("/", async (req, res) => {
      const carts = await manager.getCarts();
      res.json({
        status: "Success",
        data: carts,
      });
    });

    router.get("/:cid", async (req, res) => {
      const carts = await manager.getCarts();
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
      const addCart = await manager.addCart();
      res.json({
        status: "Success",
        data: addCart,
      });
    });

    router.post('/:cid/product/:pid', async (req, res)=>{
        const { cid, pid } = req.params;
        const carts = await manager.getCarts();
        const cart = carts.find(item => item.id === +cid);
        if(!cart){
            res.send('Carrito inexistente')
        }
        const products = await pManager.getProducts();
        const product = products.find(prod => prod.id === +pid);
        if(!product){
            res.send('Producto inexistente');
        }
        const addProduct = await manager.addToCart(cid, pid);
        res.json({
           status:"Success",
           data: addProduct 
        })
    })

  } catch (error) {
    throw new Error(error.message);
  } 
};

fileProcess();


export default router;
=======
import { Router } from "express";
const router = Router();
import cartManager from "../../daos/fsManagers/cartManager.js";
const manager = new cartManager("./src/data/carts.json");
import productManager from "../../daos/fsManagers/productManager.js";
const pManager = new productManager("./src/data/products.json");

const fileProcess = async () => {

  try {
    router.get("/", async (req, res) => {
      const carts = await manager.getCarts();
      res.json({
        status: "Success",
        data: carts,
      });
    });

    router.get("/:cid", async (req, res) => {
      const carts = await manager.getCarts();
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
      const addCart = await manager.addCart();
      res.json({
        status: "Success",
        data: addCart,
      });
    });

    router.post('/:cid/product/:pid', async (req, res)=>{
        const { cid, pid } = req.params;
        const carts = await manager.getCarts();
        const cart = carts.find(item => item.id === +cid);
        if(!cart){
            res.send('Carrito inexistente')
        }
        const products = await pManager.getProducts();
        const product = products.find(prod => prod.id === +pid);
        if(!product){
            res.send('Producto inexistente');
        }
        const addProduct = await manager.addToCart(cid, pid);
        res.json({
           status:"Success",
           data: addProduct 
        })
    })

  } catch (error) {
    throw new Error(error.message);
  } 
};

fileProcess();


export default router;
>>>>>>> origin/main

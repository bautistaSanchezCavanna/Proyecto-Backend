import { Router } from "express";
const router = Router();

import manager from '../../daos/mongoManagers/products.manager.js';
const PManager = new manager();

const fileProcess = async () => {
  try {
  
    router.get('/', async (req, res)=>{
      const {limit, sort} = req.query;
      const products = await PManager.getProducts(limit, sort);
      if(!limit){
      const limitado = products.splice(0, 10);
        return res.json({
          status: 'Success',
          data: limitado
        });
      }
      if(!sort){
        const products = await PManager.getProducts(null, null);
        return res.json({
        status: 'Success',
        data: products
      });
      }
      return res.json({
        status: 'Success',
        data: products
      });
    })

    router.get('/paginate', async (req, res)=>{
      const products = await PManager.getPaginate();
      res.json({
        status: "success.",
        payload: products
      });
      return products
    })

    router.post("/", async (req, res) => {
      const product = req.body;
      const addedProduct = await PManager.addProduct(product);
      res.json({
        status: "Producto agregado exitosamente.",
        data: addedProduct
      });
      return product;
    });

    router.get("/:pid", async (req, res) => {
      const pid = req.params.pid;
      const product = await PManager.getProductById(pid);
      if (!product) {
        return res.status(404).json({
          status: "error",
          error: "Product Not Found",
        });
      }
      res.json({ data: product });
    });

    router.put("/:pid", async (req, res) => {
      const pid = req.params.pid;
    
      if (!pid) {
        return res.status(404).json({
          status: "error",
          error: "Product Not Found",
        });
      }
      const newProduct = req.body;
      const updatedProduct = await PManager.updateProduct(pid, newProduct)

      res.json({
        status: "Success",
        data: updatedProduct
      });
    });

    router.delete("/:pid", async (req, res) => {
      const pid = req.params.pid;
      await PManager.deleteProduct(pid);
      const products = await PManager.getProducts();
      res.json({
        status: "Success",
        data: "Product deleted correctly",
        listUpdated: products
      });
    });
    
  } catch (error) {
    throw new Error(error.message);
  }
};

fileProcess();

export default router;

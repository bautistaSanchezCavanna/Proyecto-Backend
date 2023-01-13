const { Router } = require("express");
const router = Router();
const ProductManager = require("../../manager/productManager");
const manager = new ProductManager("./src/data/products.json");

const fileProcess = async () => {
  try {
  
    router.get('/', async (req, res)=>{
      const products = await manager.getProducts();
      const limit = req.query.limit;
      if(limit){
      const limitado = products.splice(0, +limit);
        return res.json({
          status: 'Success',
          data: limitado
        });
      }
      return res.json({
        status: 'Success',
        data: (products)
      });
    })

    router.post("/", async (req, res) => {
      const products = await manager.getProducts();
      
      const product = req.body;

      if (!products.find((item) => item.code === product.code)) {

         if (Object.keys(product).length < 6) {
          return res.send(
            {status:"Falta rellenar un campo, todos los campos son obligatorios."}
          ); 
        } else {
          const addProduct = await manager.addProduct(product);

          res.json({
            status: "Producto agregado exitosamente.",
            data: addProduct
          });
          return product;
         }
      }  else {
        res.send("El código de este producto ya está en uso.");
      }  
    });

    router.get("/:pid", async (req, res) => {
      const pid = req.params.pid;
      const product = await manager.getProductById(+pid);
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
      let products = await manager.getProducts();
      let product = products.find(prod=>prod.id === +pid);
      if (!product) {
        return res.status(404).json({
          status: "error",
          error: "Product Not Found",
        });
      }
      const newProduct = req.body;
      const updateProduct = await manager.updateProduct(+pid, newProduct)

      res.json({
        status: "Success",
        data: updateProduct
      });
    });

    router.delete("/:pid", async (req, res) => {
      const products = await manager.getProducts();
      const pid = req.params.pid;
      const erase = products.filter((prod) => prod.id !== +pid);
      manager.writeFile(erase);
      res.json({
        status: "Success",
        data: "Product deleted correctly",
        listUpdated: erase,
      });
    });
    
  } catch (error) {
    throw new Error(error.message);
  }
};

fileProcess();

module.exports = router;

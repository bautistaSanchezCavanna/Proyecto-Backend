const { Router } = require("express");
const router = Router();
const ProductManager = require("../../manejos/manejo");
const manager = new ProductManager("./src/data/products.json");

const fileProcess = async () => {
  let contadorId = 0;

  try {
    router.get("/", async (req, res) => {
      const products = await manager.getProducts();
      res.json({
        status: "success",
        data: products,
      });
    });

    router.post("/", async (req, res) => {
      const products = await manager.getProducts();

       if (products.length === 0) {
        return contadorId = 1;
      } else {
        contadorId = products[products.length - 1].id + 1;
      } 

      const newProduct = { id: contadorId, status: true, thumbnails: []};
      const product = {title: "Producto 3", description: "este es el producto 3", price: 200, category: "cualquiera", code: "abc789", stock: 25, ...newProduct};


      if (!products.find((item) => item.code === product.code)) {
        let atributos = Object.values(product);
        let validacion = atributos.filter((atributo) => atributo !== undefined);

        if (validacion.length < 8) {
          return res.send(
            "Falta rellenar un campo, todos los campos son obligatorios."
          );
        } else { 
          products.push(product);
          manager.addProduct(product);

          res.json({
            status: "Producto agregado exitosamente.",
            data: product
          });
          return product;
         }
      } else {
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
      const newProduct = {title:"Producto 2", description:'este es el producto 2'};
      const prodUpdate = { ...product, ...newProduct };
      product = prodUpdate;
      
      const listaUpdated = products.map(item =>{
        if(item.id === prodUpdate.id){
          return prodUpdate;
        }else{
          return item;
        }
      })
      manager.writeFile(listaUpdated); 

      res.json({
        status: "Success",
        data: "Product Updated",
        new: prodUpdate,
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

import { httpServer } from "../../index.js";
import { Server } from "socket.io";
import ProductManager from "../daos/fsManagers/productManager.js";
const manager = new ProductManager("../data/products.json");
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado, bienvenido id:", socket.id);

  socket.on("agregar-producto", async (data) => {
    await manager.addProduct(data);
    const products = await manager.getProducts();
    socket.emit("render-products", products);
  });

  socket.on("borrar-producto", async (id) => {
    await manager.deleteProduct(id);
    const products = await manager.getProducts();
    socket.emit("productos-eliminado", products);
  });
});

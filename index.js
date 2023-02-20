const express = require("express");
const { Server } = require("socket.io");
const app = express();
const PORT = 8080;

const apiRoutes = require("./src/routers/app.routers");
const viewsRoutes = require("./src/routers/vistas/views.routes");
const handlebars = require("express-handlebars");



app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.use("/", viewsRoutes);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));


const httpServer = app.listen(PORT, () => {});
const io = new Server(httpServer);

const ProductManager = require("./src/daos/fsManagers/productManager");
const mongoose = require("mongoose");
const manager = new ProductManager("./src/data/products.json");

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

const pass = "lJkVJFQEsEcyKtOh";
mongoose.set('strictQuery', true);
mongoose.connect(
  "mongodb+srv://bsanchezcavanna:lJkVJFQEsEcyKtOh@codercluster.sukhsuw.mongodb.net/ecommerce?retryWrites=true&w=majority",
  (error) => {
    if (error) {
      console.log("Cannot connect to database: " + error);
      process.exit();
    }
  }
);


const express = require("express");
const { Server } = require("socket.io");
const app = express();
const PORT = 8080;

const MongoStore = require('connect-mongo');
const handlebars = require("express-handlebars");
const session = require('express-session');

const apiRoutes = require("./src/routers/app.routers");
const viewsRoutes = require("./src/routers/vistas/views.routes");
const sessionsRoutes = require("./src/routers/sessions/sessions.routes");


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.use("/", viewsRoutes);
app.use("/sessions", sessionsRoutes);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));


app.use(session({
    name:'session1',
    secret:'elefante',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://bsanchezcavanna:lJkVJFQEsEcyKtOh@codercluster.sukhsuw.mongodb.net/dataSessions?retryWrites=true&w=majority'
    })
  }))

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


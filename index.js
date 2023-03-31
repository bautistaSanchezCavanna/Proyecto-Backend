import express from "express";
import { Server } from "socket.io";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import ProductManager from "./src/daos/fsManagers/productManager.js";
import mongoose from "mongoose";
import passport from "passport";
import MongoStore from 'connect-mongo';
import handlebars from "express-handlebars";
import session from 'express-session';
import cookieParser from 'cookie-parser';

import apiRoutes from "./src/routers/app.routers.js";
import viewsRoutes from "./src/routers/vistas/views.routes.js";
import sessionsRoutes from "./src/routers/sessions/sessions.routes.js";
import EnvConfig from "./src/config/.env.config.js";

const app = express();
const PORT = EnvConfig.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));
const manager = new ProductManager("./src/data/products.json");


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api", apiRoutes);
app.use("/", viewsRoutes);
app.use("/sessions", sessionsRoutes);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));


app.use(session({
    name:'session1',
    secret:'rinoceronte',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://bsanchezcavanna:lJkVJFQEsEcyKtOh@codercluster.sukhsuw.mongodb.net/dataSessions?retryWrites=true&w=majority'
    })
  })) 

const httpServer = app.listen(PORT, () => {});
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

mongoose.set('strictQuery', true);
mongoose.connect(
  EnvConfig.MONGO_URI,
  (error) => {
    if (error) {
      console.log("Cannot connect to database: " + error);
      process.exit();
    }
  }
);


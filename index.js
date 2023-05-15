import express from "express";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import mongoose from "mongoose";
import passport from "passport";
import cookieParser from 'cookie-parser';

import MongoStore from 'connect-mongo';
import session from 'express-session';

import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';

import apiRoutes from "./src/routers/app.routers.js";
import ViewsRouter  from "./src/routers/vistas/views.routes.js";

import EnvConfig from "./src/config/.env.config.js";
import cluster from "cluster";
import { cpus } from "os";

const app = express();
const PORT = EnvConfig.PORT;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine('handlebars', handlebars.engine({ handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api", apiRoutes);
app.use("/", ViewsRouter.getRouter());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));

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

//export const httpServer = app.listen(PORT, () => {console.log("Listening on port:", PORT);});

if(cluster.isPrimary){
  const cores = cpus().length;
  for(let i = 0; i < cores; i++){
    cluster.fork();
  }
  cluster.on('exit', ()=>{
    cluster.fork();
  }); 
}else{
  app.listen(PORT, () => {console.log(`=> [${process.pid}] listening on port: ${PORT}`);});
}

app.use(session({
    name:'session1',
    secret:'rinoceronte',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://bsanchezcavanna:lJkVJFQEsEcyKtOh@codercluster.sukhsuw.mongodb.net/dataSessions?retryWrites=true&w=majority'
    })
  })) 
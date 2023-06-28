import express from "express";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import mongoose from "mongoose";
import passport from "passport";
import cookieParser from 'cookie-parser';

import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';

import apiRoutes from "./src/routers/app.routers.js";
import ViewsRouter  from "./src/routers/vistas/views.routes.js";

import ENV from "./src/config/env.config.js";

import swaggerJSDoc from "swagger-jsdoc";
import {serve as swaggerServe, setup as swaggerSetup} from 'swagger-ui-express';

const app = express();
const PORT = ENV.PORT;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine('handlebars', handlebars.engine({ handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));

app.use(cookieParser());
app.use(passport.initialize());


app.use("/api", apiRoutes);
app.use("/", ViewsRouter.getRouter());


mongoose.set('strictQuery', true);
mongoose.connect(ENV.MONGO_URI, ()=>{console.log(`Connected to MongoDB`);}, (error) => {
    if (error) {
      console.log("Cannot connect to database: " + error);
      process.exit();
    }});

export const httpServer = app.listen(PORT, () => {console.log("Listening on port:", PORT);});


const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info:{
      title: 'Ecommerce BSC - API',
      description: '',
      version: '1.0.0'
    }
  },
  apis:[
    `${process.cwd()}/src/docs/**/*.yaml`,
  ]
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api/doc", swaggerServe, swaggerSetup(specs));

/* import cluster from "cluster";
import { cpus } from "os"; 
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
  */

/* import MongoStore from 'connect-mongo';
import session from 'express-session';
  app.use(session({
    name:'session1',
    secret:'rinoceronte',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://bsanchezcavanna:lJkVJFQEsEcyKtOh@codercluster.sukhsuw.mongodb.net/dataSessions?retryWrites=true&w=majority'
    })
  }))  */
 
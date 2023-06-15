<<<<<<< HEAD
import { Router } from "express";
import { verify } from "jsonwebtoken";
import EnvConfig from "../config/.env.config.js";
import { HTTP_STATUS } from "../constants/constants.js";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      }catch (error) {
        console.log(error);
        params[1].status(HTTP_STATUS.SERVER_ERROR).send(error);
      }
    });
  }

  buildResponses(req, res, next) {
    res.sendSuccess = (payload, status = HTTP_STATUS.OK) => res.status(status).json({ result: "SUCCESS", payload });
    res.sendError = (error, status = HTTP_STATUS.SERVER_ERROR) => res.status(status).json({ result: "ERROR", error });
    next();
  } 

  handleAuthRoles(roles) {
    return async (req, res, next) => {
      if (roles[0] === "PUBLIC") {
        return next();
      }

      const token = req.cookies[EnvConfig.SESSION_KEY];
      if (!token) {
        return res.sendError("Not authenticated", HTTP_STATUS.UNAUTHORIZED);
      };

      const user = verify(token, EnvConfig.SECRET_KEY);

      if(!roles.includes(`${user.role}`.toUpperCase())){return res.sendError("Access denied", HTTP_STATUS.FORBIDDEN);};
      req.user = user;
      next();
    };
  }


  get(path, roles, ...callbacks){
    this.router.get(path, this.buildResponses, this.handleAuthRoles(roles), this.applyCallbacks(callbacks))
  }

  post(path, roles, ...callbacks){
    this.router.post(path, this.buildResponses, this.handleAuthRoles(roles), this.applyCallbacks(callbacks))
  }

  put(path, roles, ...callbacks){
    this.router.put(path, this.buildResponses, this.handleAuthRoles(roles), this.applyCallbacks(callbacks))
  }
  
  delete(path, roles, ...callbacks){
    this.router.delete(path, this.buildResponses, this.handleAuthRoles(roles), this.applyCallbacks(callbacks))
  }

}
=======
import { Router } from "express";
import { verify } from "jsonwebtoken";
import EnvConfig from "../config/.env.config.js";
import { HTTP_STATUS } from "../constants/constants.js";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      }catch (error) {
        console.log(error);
        params[1].status(HTTP_STATUS.SERVER_ERROR).send(error);
      }
    });
  }

  buildResponses(req, res, next) {
    res.sendSuccess = (payload, status = HTTP_STATUS.OK) => res.status(status).json({ result: "SUCCESS", payload });
    res.sendError = (error, status = HTTP_STATUS.SERVER_ERROR) => res.status(status).json({ result: "ERROR", error })/* .redirect('/accessDenied.html') */;
    next();
  } 

  handleAuthRoles(roles) {
    return async (req, res, next) => {
      if (roles[0] === "PUBLIC") {
        return next();
      }

      const token = req.cookies[EnvConfig.SESSION_KEY];
      if (!token) {
        return res.sendError("Not authenticated", HTTP_STATUS.UNAUTHORIZED);
      };

      const user = verify(token, EnvConfig.SECRET_KEY);

      if(!roles.includes(`${user.role}`.toUpperCase())){return res.sendError("Access denied", HTTP_STATUS.FORBIDDEN);};
      req.user = user;
      next();
    };
  }


  get(path, roles, ...callbacks){
    this.router.get(path, this.buildResponses, this.handleAuthRoles(roles), this.applyCallbacks(callbacks))
  }

  post(path, roles, ...callbacks){
    this.router.post(path, this.buildResponses, this.handleAuthRoles(roles), this.applyCallbacks(callbacks))
  }

  put(path, roles, ...callbacks){
    this.router.put(path, this.buildResponses, this.handleAuthRoles(roles), this.applyCallbacks(callbacks))
  }
  
  delete(path, roles, ...callbacks){
    this.router.delete(path, this.buildResponses, this.handleAuthRoles(roles), this.applyCallbacks(callbacks))
  }

}
>>>>>>> origin/main

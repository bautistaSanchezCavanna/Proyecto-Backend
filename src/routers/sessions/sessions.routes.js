import { Router } from "express";
import passportCustom from "../../middlewares/passport-custom.middlewares.js";
import SessionsController from "../../controllers/sessions.controller.js";
import CustomRouter from "../customRouter.js";

export const router = Router();


export class SessionsRouter extends CustomRouter {
  init() {
    this.post("/login", ["PUBLIC"], SessionsController.login);
    
    this.post("/register", ["PUBLIC"], SessionsController.register);
    
    this.get("/github", ["PUBLIC"], passportCustom("github", { scope: ["user:email"] }));

    this.get( "/github/authentication", ["PUBLIC"], passportCustom("github"), SessionsController.loginGithub);

    this.get("/current", ["ADMIN"], SessionsController.current);
  }
}

export default new SessionsRouter();

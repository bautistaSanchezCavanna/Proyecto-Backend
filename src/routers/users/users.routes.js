import { Router } from "express";
import passportCustom from "../../middlewares/passport-custom.middlewares.js";
import UsersController from "../../controllers/users.controller.js";
import CustomRouter from "../customRouter.js";

export const router = Router();


export class UsersRouter extends CustomRouter {
  init() {
    this.post("/login", ["PUBLIC"], UsersController.login);
    
    this.post("/register", ["PUBLIC"], UsersController.register);
    
    this.get("/github", ["PUBLIC"], passportCustom("github", { scope: ["user:email"] }));

    this.get( "/github/authentication", ["PUBLIC"], passportCustom("github", 
    { failureRedirect: "/github-error" }), UsersController.loginGithub);

    this.get("/current", ["ADMIN"], UsersController.current);
  }
}

export default new UsersRouter();

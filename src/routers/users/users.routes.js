<<<<<<< HEAD
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
=======
import { Router } from "express";
import passportCustom from "../../middlewares/passport-custom.middlewares.js";
import UsersController from "../../controllers/users.controller.js";
import CustomRouter from "../customRouter.js";

export const router = Router();

/* const usersProcess = () => {
  try {
    router.post("/login", SessionController.login);

    router.post("/register",
      passport.authenticate("register", { failureRedirect: "/registerError" }),
      (req, res) => {
        res.json({ status: "Ok", data: req.user });
        console.log("Register OK");
        console.log(req.user);
        res.redirect("/");
      }
    );

    router.get("/github",
      passportCustom("github", { scope: ["user:email"] })
    );

    router.get("/github/authentication", 
    passportCustom("github", { failureRedirect: '/github-error' }),
    SessionController.loginGithub
    );

    router.get("/current", passportCustom("jwt"), authorization('ADMIN'), async (req, res) => {
      res.send({ payload: req.user });
    });


  } catch (error) {
    throw new Error(error.message);
  }
};

usersProcess(); */

export class UsersRouter extends CustomRouter {
  init() {
    this.post("/login", ["PUBLIC"], UsersController.login);
    
    this.post("/register", ["PUBLIC"], UsersController.register);
    
    this.get("/github", ["PUBLIC"], passportCustom("github", { scope: ["user:email"] }));

    this.get( "/github/authentication", ["PUBLIC"], passportCustom("github", 
    { failureRedirect: "/github-error" }), UsersController.loginGithub);

    this.get("/current", ["ADMIN"]/* , passportCustom("jwt") */, UsersController.current);
  }
}

export default new UsersRouter();
>>>>>>> origin/main

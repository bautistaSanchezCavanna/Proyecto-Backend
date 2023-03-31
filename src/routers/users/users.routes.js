import { Router } from "express";
import passportCustom from "../../middlewares/passport-custom.middlewares.js";
import passport from "../../middlewares/passport.middleware.js";
import  SessionController  from "../../controllers/jwtSessions.controller.js";
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

export  class UsersRouter extends CustomRouter {
  init(){
    this.post("/login", ["PUBLIC"], SessionController.login);

    this.post("/register", ["PUBLIC"],
    passport.authenticate("register", { failureRedirect: "/registerError" }),
    (req, res) => {
      res.json({ status: "Ok", data: req.user });
      res.redirect("/");
    }
  );

    this.get("/github", ["PUBLIC"],
      passportCustom("github", { scope: ["user:email"] })
    );

    this.get("/github/authentication", ["PUBLIC"],
    passportCustom("github", { failureRedirect: '/github-error' }),
    SessionController.loginGithub
    );

    this.get("/current", ["ADMIN"], passportCustom("jwt"), async (req, res) => {
      res.send({ payload: req.user });
    }); 
  }
}

export default new UsersRouter();
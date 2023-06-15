import { Router } from "express";
import passport from "../../middlewares/passport.middleware.js";
import { logoutController } from "../../controllers/session.controler.js";
const router = Router();

const sessionsProcess = async () => {
  try {
    router.post(
      "/login",
      passport.authenticate("login", { failureRedirect: "/loginError" }),
      (req, res) => {
        if (!req.user) {
          res.json({ status: "Error", data: "Wrong user or password" });
        }
        const sessionUser = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          age: req.user.age,
          email: req.user.email,
        };
        req.session.user = sessionUser;
        req.session.isAdmin = req.user.email.split("@")[1].includes("admin") ?? false;
        res.json({ status: "OK", payload: sessionUser });
      }
    );

    router.post(
      "/register",
      passport.authenticate("register", { failureRedirect: "/registerError" }),
      (req, res) => {
        res.json({ status: "Ok", data: req.user });
        res.redirect("/");
      }
    );

    router.get(
      "/github",
      passport.authenticate("github", { scope: ["user:email"] })
    );

    router.get(
      "/github/authentication",
      passport.authenticate("github", { failureRedirect: "/githubError" }),
      async (req, res) => {
        const sessionUser = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          age: req.user.age,
          email: req.user.email,
        };
        req.session.user = sessionUser;
        res.redirect("/products");
      }
    );

    router.get("/logout", logoutController);
  } catch (error) {
    throw new Error(error.message);
  }
};

sessionsProcess();


export default router;
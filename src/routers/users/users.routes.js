const { Router } = require("express");
const authToken = require("../../../middlewares/authenticationJwt.middleware.js");
const authorization = require("../../../middlewares/authorization.middleware.js");
const passportCustom  = require("../../../middlewares/passport-custom.middlewares.js");
const passport = require("../../../middlewares/passport.middleware.js");
const {
  SessionController,
} = require("../../controllers/jwtSessions.controller.js");
const router = Router();

const jwtProcess = () => {
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

jwtProcess();

module.exports = router;

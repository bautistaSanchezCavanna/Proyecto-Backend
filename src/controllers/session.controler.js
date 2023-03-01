const userModel = require("../daos/models/users.model");
const { hashPassword, isValidPassword } = require("../utils/utils.js");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    console.log("User not found, you must sign up to create one.");
  } else {
    if (!isValidPassword(user, password)) {
      res.status(400).send("Wrong user or password");
    } else {
      const sessionUser = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
      };
      req.session.user = sessionUser;
      req.session.isAdmin = email.split("@")[1].includes("admin") ?? false;
      req.session.save((err) => {
        if (err) console.log("Session error ", err);
      });
      res.redirect("/products");
    }
  }
};

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    console.log("User already exists, Log in.");
  }
  const createUser = { ...req.body, password: hashPassword(password) };
  const newUser = await userModel.create(createUser);
  /* const sessionUser = {
    _id: newUser._id,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    age: newUser.age,
    email: newUser.email,
  };
  req.session.user = sessionUser; */
  req.session.save((err) => {
    if (err) console.log("Session error ", err);
  });
  res.redirect("/login");
};

const logoutController = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.clearCookie("session1");
    }
  });
};

module.exports = { loginController, registerController, logoutController };

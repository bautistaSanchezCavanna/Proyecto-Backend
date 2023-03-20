const userModel = require("../daos/models/users.model");
const { generateToken, isValidPassword } = require("../utils/utils");

class SessionController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        console.log("User not found, you must sign up to create one.");
      }else{
        if (!isValidPassword(user, password)) {
          console.log("Wrong email or password");
        } else {
          const sessionUser = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            role: user.role,
            email: user.email,
          };
          const access_token = generateToken(sessionUser);
          req.user = sessionUser;
          res.cookie("cookieToken", access_token, {
              maxAge: 60 * 60 * 1000,
              httpOnly: true,
            }).redirect("/products");
        }
      }
      
    } catch (error) {
      next(error);
    }
  }

  static async loginGithub(req, res, next) {
    try {
        const user = req.user;
        const access_token = generateToken(user);
        res.cookie("cookieToken", access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          }).redirect("/products");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { SessionController };

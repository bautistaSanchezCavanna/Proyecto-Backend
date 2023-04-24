import { UsersService } from "../services/users.service.js";
import { generateToken } from "../utils/utils.js";

export default class UsersController {
  static async login(req, res, next) {
    try {
      const payload = req.body;
      const sessionUser = await UsersService.login(payload);
      req.user = sessionUser;
    if(sessionUser){
      const access_token = generateToken(sessionUser);
      res.cookie("cookieToken", access_token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        }).redirect("/products");
       }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
    const userPayload = req.body;
    const newUser = await UsersService.register(userPayload);
    res.status(200).json(newUser);
     } catch (error) {
      next(error);
    }
  }

  static async loginGithub(req, res, next) {
    try {
      const user = req.user;
      const access_token = generateToken(user);
      res
        .cookie("cookieToken", access_token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        })
        .redirect("/products");
    } catch (error) {
      next(error);
    }
  }
}

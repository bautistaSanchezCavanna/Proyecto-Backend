import ENV from "../config/env.config.js";
import { SessionsService } from "../services/sessions.service.js";
import { generateToken } from "../utils/session.utils.js";

export default class SessionsController {
  static async login(req, res, next) {
    try {
      const payload = req.body;
      const response = await SessionsService.login(payload);
      req.user = response;
      if (response.status) {
        console.log(response);
        return res.send(response/* , response.status */);
      }
      const access_token = generateToken(response);
      return res.cookie(ENV.SESSION_KEY, access_token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      }).redirect("/products");


    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const userPayload = req.body;
      const response = await SessionsService.register(userPayload);
      if (response.status) {
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async loginGithub(req, res, next) {
    try {
      const user = req.user;
      const access_token = generateToken(user);
      return res.cookie(ENV.SESSION_KEY, access_token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        }).redirect("/products");
    } catch (error) {
      next(error);
    }
  }

  static async current(req, res, next) {
    try {
      res.sendSuccess(req.user);
    } catch (error) {
      next(error);
    }
  }
}
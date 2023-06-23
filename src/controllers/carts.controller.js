import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/constants.js";
import CartsService from "../services/carts.service.js";
import ENV from "../config/env.config.js";
export default class CartsController {

  static async getCarts(req, res, next) {
    try {
      const response = await CartsService.getCarts();
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async getCartById(req, res, next) {
    const cid = req.params.cid;
    try {
      const response = await CartsService.getCartById(cid);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async createCart(req, res, next) {
    try {
      const response = await CartsService.createCart();
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response, HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async addToCart(req, res, next) {
    const { cid, pid } = req.params;
    try {
      const response = await CartsService.addToCart(cid, pid);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const { cid, pid } = req.params;
    try {
      const response = await CartsService.deleteProduct(cid, pid);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateCart(req, res, next) {
    const payload = req.body;
    const { cid, pid } = req.params;
    try {
      const response = await CartsService.updateCart(cid, pid, payload);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async cleanCart(req, res, next) {
    const {cid} = req.params;
    try {
      const response = await CartsService.cleanCart(cid);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req, res, next) {
    const {cid} = req.params;
    try {
      const response = await CartsService.deleteCart(cid);
      if(response.status){
        return res.sendError(response, response.status);
      }
      return res.sendSuccess(response);
    } catch (error) {
      next(error);
    }
  }

  static async purchaseCart(req, res, next){
    const {cid} = req.params;
    const token = req.cookies[ENV.SESSION_KEY];
    const user = jwt.decode(token);
    try {
      const response = await CartsService.purchaseCart(cid, user);
       if(response.status){
        return res.sendError(response, response.status);
      } 
      const ticketCookieOptions = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, 
      };
      
      return res.cookie(ENV.TICKET_KEY, response._id, ticketCookieOptions).sendSuccess(response);

    } catch (error) {
      next(error);
    }
  }
}
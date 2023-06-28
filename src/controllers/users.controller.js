import argsConfig from "../config/args.config.js";
import ENV from "../config/env.config.js";
import { mailingTransporter } from "../config/mailing.config.js";
import CartsService from "../services/carts.service.js";
import { UsersService } from "../services/users.service.js";

export default class UsersController {

    static async getUsers(req, res, next) {
        try {
            const response = await UsersService.getUsers();
            if (response.status) {
                return res.sendError(response, response.status);
            }
            return res.sendSuccess(response);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        const uid = req.params.uid;
        try {
            const response = await UsersService.getUserById(uid);
            if (response.status) {
                return res.sendError(response, response.status);
            }
            return res.sendSuccess(response);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        const uid = req.params.uid;
        const update = req.body;
        try {
            const response = await UsersService.updateUser(uid, update);
            if (response.status) {
                return res.sendError(response, response.status);
            }
            return res.sendSuccess(response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        const uid = req.params.uid;
        try {
            const response = await UsersService.deleteUser(uid);
            if (response.status) {
                return res.sendError(response, response.status);
            }
            return res.sendSuccess(response);
        } catch (error) {
            next(error);
        }
    }

    static async deleteInactiveUsers(req, res, next){
        try {
            const response = await UsersService.deleteInactiveUsers();
            if (response.status) {
                return res.sendError(response, response.status);
            }
            for(const user of response){
                await CartsService.deleteCart(user.cart);
                const mailParams = {
                    from: `Proyecto Ecommerce <${ENV.MAILING_USER}>`,
                    to: user.email,
                    subject: 'Aviso de dado de baja por inactividad',
                    html: `<div>
                            <h2>Aviso!</h2>
                            <p>Tu cuenta se eliminó por inactividad. Para iniciar sesión, deberás registrarte nuevamente.</p>
                            <a href="http://localhost:8080/register">Registrarse</a> nuevamente.</p>
                          </div>`,
                    attachments: []
                  } 
                  await mailingTransporter.sendMail(mailParams);
            }
            return res.sendSuccess(response);
        } catch (error) {
            next(error);
        }
    }
}
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
}
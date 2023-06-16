import { HTTP_STATUS } from "../constants/constants.js";
import UsersDAO from "../daos/mongoManagers/users.manager.js";
import { HttpError } from "../utils/error.utils.js";


export class UsersService {

    static async getUsers() {
        try {
            const user = await UsersDAO.getUsers();
            if(!user){
                return new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getUserByEmail(email) {
        try {
            const user = await UsersDAO.getUserByEmail(email);
            if(!user){
                return new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    static async getUserById(uid) {
        try {
            const user = await UsersDAO.getUserById(uid);
            if(!user){
                return new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /* static async createUser() {
        const payload = req.body;
        try {
           
        } catch (error) {
            throw new Error(error.message);
        }
    } */

    static async updateUser(uid, update) {
        try {
            const user = await UsersDAO.updateUser(uid, update);
            if(!user){
                return new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteUser(uid) {
        try {
            const user = await UsersDAO.deleteUser(uid);
            if(!user){
                return new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
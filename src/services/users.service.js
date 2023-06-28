import args from "../config/args.config.js";
import { HTTP_STATUS } from "../constants/constants.js";
import CartsDAO from "../daos/mongoManagers/carts.manager.js";
import UsersDAO from "../daos/mongoManagers/users.manager.js";
import { HttpError } from "../utils/error.utils.js";

class UserDTO {
    constructor(_id, name, email, role) {
      this._id = _id;
      this.name = name;
      this.email = email;
      this.role = role;
    }
  }
  
export class UsersService {

    static async getUsers(email) {
        try {
            const allUsers = await UsersDAO.getUsers();
            const users = allUsers.filter(user=> user.email !== email);
            if(!users){
                return new HttpError("Users not found", HTTP_STATUS.NOT_FOUND);
            }
            if(args.mode === 'production'){
                return users.map(user => new UserDTO(user._id, user.first_name, user.email || user.githubLogin, user.role));
            }
            return users;
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
            if(args.mode === 'production'){
                return new UserDTO(user._id, user.first_name, user.email || user.githubLogin, user.role)
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

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
            const cid = user.cart;
            await CartsDAO.deleteCart(cid);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteInactiveUsers(){
        //const inactivity_limit = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
        const inactivity_limit = new Date(Date.now() - 5 * 60 * 1000);
        const deletedUsers = await UsersDAO.deleteInactiveUsers(inactivity_limit);
        return deletedUsers;
    }
}
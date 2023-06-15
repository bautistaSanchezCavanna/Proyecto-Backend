import { userModel } from "../schemas/users.schema.js";

export default class UsersDAO {

    static async getUsers(){
        return await userModel.find();
    }

    static async getUserByEmail(email){
        return await userModel.findOne({ email });
    }

    static async createUser(newUser){
       return await userModel.create(newUser);
    }

    static async updateUser(){}

    static async deleteUser(){}
}
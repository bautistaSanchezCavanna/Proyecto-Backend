import { userModel } from "../schemas/users.schema.js";

export default class UsersDAO {

    static async getUsers(){
        return await userModel.find();
    }

    static async getUserByEmail(mail){
        return await userModel.findOne({ email: mail });
    }

    static async getUserById(uid){
        return await userModel.findById(uid);
    }

    static async createUser(newUser){
       return await userModel.create(newUser);
    }

    static async updateUser(uid, update){
    return await userModel.findOneAndUpdate({_id: uid}, update, {new:true});
    }

    static async deleteUser(uid){
    return await userModel.findOneAndDelete({_id: uid});
    }

    static async deleteInactiveUsers(inactivity_limit){
    const usersToDelete = await userModel.find({ lastConnection: { $lt: inactivity_limit } });
    await userModel.deleteMany({ lastConnection: { $lt: inactivity_limit } })
    return usersToDelete;
    }
}
import UsersDAO from "../daos/mongoManagers/users.manager.js";
import { hashPassword, isValidPassword } from "../utils/utils.js";

export class UsersService {

  static async login(payload) {
    try {
        const {email, password} = payload;
        const user = await UsersDAO.getUserByEmail(email)
        if (!user) {
          return console.log("User not found, you must sign up to create one.");
        } 
        if (!isValidPassword(user, password)) {
           return console.log("Wrong email or password");
        }else{
            const sessionUser = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                role: user.role,
                email: user.email,
              };
              return sessionUser;
        }
            
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async register(userPayload){
    try{
    const { first_name, last_name, age, email, password } = userPayload; 
    const user = await UsersDAO.getUserByEmail(email);
      if (user) {
        console.log("user already exists");
      } else {
        const newUser = {
          first_name,
          last_name,
          age,
          role: email.split("@")[1].includes("admin") ? "ADMIN" : "USER",
          email,
          password: hashPassword(password),
        };
        const createdUser = await UsersDAO.createUser(newUser);
        return createdUser;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

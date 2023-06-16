import { HTTP_STATUS } from "../constants/constants.js";
import CartsDAO from "../daos/mongoManagers/carts.manager.js";
import UsersDAO from "../daos/mongoManagers/users.manager.js";
import { HttpError } from "../utils/error.utils.js";
import { hashPassword, isValidPassword } from "../utils/session.utils.js";

export class SessionsService {

  static async login(payload) {
    try {
        const {email, password} = payload;
        const user = await UsersDAO.getUserByEmail(email)
        if (!user) {
          return new HttpError("User not found, you must sign up to create one.", HTTP_STATUS.NOT_FOUND);
        } 
        if (!isValidPassword(user, password)) {
           return new HttpError("Wrong email or password", HTTP_STATUS.FORBIDDEN);
        }else{
            const sessionUser = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                role: user.role,
                email: user.email,
                cart:user.cart
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
        return new HttpError("User already exists", HTTP_STATUS.BAD_REQUEST);
      } else {
        const createCart = await CartsDAO.createCart();
        const cart = await CartsDAO.getCartById(createCart._id);
        const newUser = {
          first_name,
          last_name,
          age,
          role: email.split("@")[1].includes("admin") ? "ADMIN" : "USER",
          email,
          password: hashPassword(password),
          cart:cart._id
        };
        await UsersDAO.createUser(newUser);
        const newUserDTO = {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          age: newUser.age,
          role: newUser.role,
          email: newUser.email,
          cart: newUser.cart._id
        }
        return newUserDTO;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

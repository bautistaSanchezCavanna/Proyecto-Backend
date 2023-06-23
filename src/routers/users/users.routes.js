import UsersController from "../../controllers/users.controller.js";
import CustomRouter from "../customRouter.js";
  
  export class UsersRouter extends CustomRouter {
    init() {
    this.get('/', ["PUBLIC"], UsersController.getUsers);
     
    this.get('/email/:email', ["ADMIN"], UsersController.getUserByEmail);

    this.get('/uid/:uid', ["PUBLIC"], UsersController.getUserById);

    this.put("/:uid", ["ADMIN"], UsersController.updateUser);

    this.delete("/:uid", ["ADMIN"], UsersController.deleteUser);
    
  } 
};

export default new UsersRouter();
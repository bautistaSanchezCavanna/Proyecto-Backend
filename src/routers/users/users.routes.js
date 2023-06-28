import UsersController from "../../controllers/users.controller.js";
import CustomRouter from "../customRouter.js";
  
  export class UsersRouter extends CustomRouter {
    init() {
    this.get('/', ["ADMIN"], UsersController.getUsers);
     
    this.get('/:uid', ["ADMIN"], UsersController.getUserById);

    this.put("/:uid", ["ADMIN"], UsersController.updateUser);

    this.delete("/:uid", ["ADMIN"], UsersController.deleteUser);
    
    this.delete("/", ["ADMIN"], UsersController.deleteInactiveUsers);

  } 
};

export default new UsersRouter();
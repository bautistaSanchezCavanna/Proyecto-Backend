import UsersController from "../../controllers/users.controller.js";
import CustomRouter from "../customRouter.js";
  
  export class UsersRouter extends CustomRouter {
    init() {
    this.get('/', ["PUBLIC"], UsersController.getUsers);
     
    this.get('/email/:email', ["PUBLIC"], UsersController.getUserByEmail);

    this.get('/uid/:uid', ["PUBLIC"], UsersController.getUserById);

    //this.post("/", ["ADMIN"], UsersController.createUser);

    this.put("/:uid", ["PUBLIC"], UsersController.updateUser);

    this.delete("/:uid", ["PUBLIC"], UsersController.deleteUser);
    
  } 
};

export default new UsersRouter();
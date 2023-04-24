import CartsDAO from "./mongoManagers/carts.manager.js";
import ProductsDAO from "./mongoManagers/products.manager.js";
import UsersDAO from "./mongoManagers/users.manager.js";

const productsDAO = new ProductsDAO();
const usersDAO = new UsersDAO();
const cartsDAO = new CartsDAO();

export const getDAOS = () => {
  return { productsDAO, usersDAO, cartsDAO };
};

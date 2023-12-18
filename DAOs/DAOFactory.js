import ProductsDAO from './ProductsDAO.js';
import UsersDAO from './usersDAO.js';
import CartsDAO from './cartsDAO.js';

let dao = {
    prodDAO: ProductsDAO.getInstance(),
    userDAO: UsersDAO.getInstance(),
    cartDAO: CartsDAO.getInstance()
} 


export default class DAOFactory {
    static getDao() {
        return dao
    }
}
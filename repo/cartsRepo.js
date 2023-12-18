import DAOFactory from "../DAOs/DAOFactory.js";
import logger from "../utils/logger.js";

export default class CartsRepo {
    constructor() {
        this.dao = DAOFactory.getDao().cartDAO;
    }

    async createCart(obj) {
        try {
            let newCart = await this.dao.createCart(obj);
            return newCart;
        } catch (err) {
            logger.error(err);
        }
    }
    async addProduct(cartId, productId) {
        let data = null;
        try {
            let data = await this.dao.addProduct(cartId, productId);
            return data;
        } catch (err) {
            logger.error(err);
        }
    }

    async getByCartId(id) {
        let data = null;
        try {
            data = await this.dao.getByCartId(id);
            return data;
        } catch (err) {
            logger.error(err);
        }
    }

    async getAll() {
        let data = null;
        try {
            data = await this.dao.getAll();
            return data;
        } catch (err) {
            logger.error(err);
        }
    }

    async deleteCartById(id) {
        let data = null;
        try {
            data = await this.dao.deleteCartById(id);
            return data;
        } catch (err) {
            console.log(`Ocurrio un error ${err}`);
        }
    }

    async deleteCartProductById(cartId, productId) {
        let data = null;
        try {
            data = await this.dao.deleteCartProductById(cartId, productId);
            return data;
        } catch (err) {
            logger.error(err);
        }
    }
}
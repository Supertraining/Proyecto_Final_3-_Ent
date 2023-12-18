import CartsRepo from "../repo/cartsRepo.js";
import logger from "../utils/logger.js";

export default class CartsServices {
    constructor() {
        this.repo = new CartsRepo();
    }

    async createCart(obj) {
        try {
            let newCart = await this.repo.createCart(obj);
            return newCart;
        } catch (err) {
            logger.error(err);
        }
    }
    async addProduct(cartId, productId) {
        let data = null;
        try {
            let data = await this.repo.addProduct(cartId, productId);
            return data;
        } catch (err) {
            logger.error(err);
        }
    }

    async getByCartId(id) {
        let data = null;
        try {
            data = await this.repo.getByCartId(id);
            return data;
        } catch (err) {
            logger.error(err);
        }
    }

    async getAll() {
        let data = null;
        try {
            data = await this.repo.getAll();
            return data;
        } catch (err) {
            logger.error(err);
        }
    }

    async deleteCartById(id) {
        let data = null;
        try {
            data = await this.repo.deleteCartById(id);
            return data;
        } catch (err) {
            console.log(`Ocurrio un error ${err}`);
        }
    }

    async deleteCartProductById(cartId, productId) {
        let data = null;
        try {
            data = await this.repo.deleteCartProductById(cartId, productId);
            return data;
        } catch (err) {
            logger.error(err);
        }
    }
}
import DAOFactory from "../DAOs/DAOFactory.js";
import { productoDTO } from "../DTOs/productDTO.js";
import ProductModel from "../models/product.js";
import logger from "../utils/logger.js";
export default class ProductRepo {
    constructor() {
        this.dao = DAOFactory.getDao().prodDAO;

    }

    async save(obj) {
        try {
            const productDb = productoDTO(obj)
            return await this.dao.save(productDb);
        } catch (error) {
            logger.error(error);
        }

    }

    async getById(id) {
        try {
            const product = await this.dao.getById(id);
            return new ProductModel(product);
        } catch (error) {
            logger.error(error);
        }

    }

    async updateProduct(id, update) {
        try {
            const data = await this.dao.updateProduct(id, update);
            return data;
        } catch (error) {
            logger.error(error);
        }

    }

    async getAll() {
        try {
            const products = await this.dao.getAll();
            return products.map((p) => new ProductModel(p).datos());
        } catch (error) {
            logger.error(error);
        }

    }

    async deleteById(id) {
        try {
            const data = await this.dao.deleteById(id);
            return data;
        } catch (error) {
            logger.error(error);
        }

    }

}
import ProductsRepo from '../repo/productsRepo.js';
import logger from '../utils/logger.js';

export default class ProductServices {
    constructor() {
        this.repo = new ProductsRepo();
    }

    async save(obj) {
        try {
            const product = await this.repo.save(obj);
            return product;
        } catch (error) {
            logger.error(error);
        }

    }

    async getById(id) {
        try {
            const product = await this.repo.getById(id);
            return product;
        } catch (error) {
            logger.error(error);
        }
    }

    async updateProduct(id, update) {
        try {
            const data = await this.repo.updateProduct(id, update);
            return data;
        } catch (error) {
            logger.error(error);
        }

    }

    async getAll() {
        try {
            const products = await this.repo.getAll();
            return products;
        } catch (error) {
            logger.error(error);
        }

    }

    async deleteById(id) {
        try {
            const data = await this.repo.deleteById(id);
            return data;
        } catch (error) {
            logger.error(error);
        }

    }
}
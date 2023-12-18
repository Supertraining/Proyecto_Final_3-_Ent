import { Router } from 'express';
import ProductsController from '../controllers/products.js';

const router = Router();

export default class ProductsRouter {
    constructor() {
        this.productController = new ProductsController();
    }

    start() {
        router.get('/:id?', this.productController.getAll);
        router.post('/', this.productController.isAuthorized, this.productController.save);
        router.put('/:id', this.productController.isAuthorized, this.productController.updateProduct);
        router.delete('/:id', this.productController.isAuthorized, this.productController.deleteById);
        return router;
    }

}






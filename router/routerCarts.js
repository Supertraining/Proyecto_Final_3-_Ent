import { Router } from 'express';
import CartsController from '../controllers/carts.js';


const router = Router();

export default class CartsRouter {
    constructor() {
        this.controllers = new CartsController()
    }
    start() {

        router.get('/:id/productos', this.controllers.getCartProducts);
        router.post('/', this.controllers.createCart);
        router.post('/:idCarrito/productos/:idProducto/', this.controllers.addProductToCart);
        router.delete('/:id', this.controllers.deleteCart);
        router.delete('/:idCarrito/productos/:id_prod', this.controllers.deleteProductFromCart);

        return router;

    }


}


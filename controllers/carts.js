import CartsServices from '../services/carts.js';


export default class CartsController {
	constructor() {
		this.cartServices = new CartsServices();
	}
	getCartProducts = async (req, res) => {
		let data = await cartContainer.getByCartId(req.params.id);
		res.json(data);
	};
	createCart = async (req, res) => {
		let data = await cartContainer.createCart(req.body);
		res.json(data);
	};
	addProductToCart = async (req, res) => {
		let data = await cartContainer.addProduct(req.params.idCarrito, req.params.idProducto);
		res.json(data);
	};
	deleteCart = async (req, res) => {
		const id = req.params.id;
		let data = await cartContainer.deleteCartById(id);
		res.json(data);
	};
	deleteProductFromCart = async (req, res) => {
		let data = await cartContainer.deleteCartProductById(
			req.params.idCarrito,
			req.params.id_prod
		);
		res.json(data);
	};
}


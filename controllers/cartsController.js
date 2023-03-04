import cartsContainer from '../api/cartsContainer.js';
const cartContainer = new cartsContainer(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

export const getCartProducts = async (req, res) => {
	let data = await cartContainer.getByCartId(req.params.id);
	res.json(data);
};
export const createCart = async (req, res) => {
	let data = await cartContainer.createCart(req.body);
	res.json(data);
};
export const addProductToCart = async (req, res) => {
	let data = await cartContainer.addProduct(req.params.idCarrito, req.params.idProducto);
	res.json(data);
};
export const deleteCart = async (req, res) => {
	const id = req.params.id;
	let data = await cartContainer.deleteCartById(id);
	res.json(data);
};
export const deleteProductFromCart = async (req, res) => {
	let data = await cartContainer.deleteCartProductById(
		req.params.idCarrito,
		req.params.id_prod
	);
	res.json(data);
};

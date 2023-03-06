import ProductsContainer from '../api/ProductsContainer.js';
const products = new ProductsContainer();

export const getProducts = async (req, res) => {
	let data = null;
	!req.params.id
		? (data = await products.getAll())
		: (data = await products.getById(req.params.id));
	res.json(data);
};
export const createProduct = async (req, res) => {
	let data = await products.save(req.body);
	res.json(data);
};
export const updateProduct = async (req, res) => {
	let data = await products.updateProduct(req.params.id, req.body);
	res.json(data);
};
export const deleteProduct = async (req, res) => {
	let data = await products.deleteById(req.params.id);
	res.json(data);
};
export const isAuthorized = (req, res, next) => {
	const admin = true;
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' })
		: next();
};
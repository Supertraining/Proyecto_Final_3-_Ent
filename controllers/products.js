import ProductServices from '../services/products.js';
import logger, { routeLogger } from '../utils/logger.js';
export default class ProductsControllers {
	constructor() {
		this.products = new ProductServices();
	}

	save = async (req, res) => {
		try {
			let data = await this.products.save(req.body);
			res.json(data);
		} catch (error) {
			routeLogger(req, error);
		}

	};

	getById = async (req, res) => {
		try {
			let data = await this.products.getById(req.params.id);
			res.json(data);
		} catch (error) {
			routeLogger(req, error);
		}
	}

	updateProduct = async (req, res) => {
		try {
			let data = await this.products.updateProduct(req.params.id, req.body);
			res.json(data);
		} catch (error) {
			routeLogger(req, error);
		}

	};

	getAll = async (req, res) => {
		try {
			let data = null;
			!req.params.id
				? (data = await this.products.getAll())
				: (data = await this.products.getById(req.params.id));
			res.json(data);
			
		} catch (error) {
			routeLogger(req, error);
		}

	};

	deleteById = async (req, res) => {
		try {
			let data = await this.products.deleteById(req.params.id);
			res.json(data);
		} catch (error) {
			routeLogger(req, error);
		}

	};
	
	isAuthorized = (req, res, next) => {
		const admin = true;
		!admin
			? res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' })
			: next();
	};
};
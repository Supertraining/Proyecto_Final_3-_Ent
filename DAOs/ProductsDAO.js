import Productmodel from '../schemas/product.js';
import logger from '../utils/logger.js';
import { productoDTO } from '../DTOs/productDTO.js';

let instance = null;
export default class ProductsDAO {

	async save(obj) {
		try {
			const product = await Productmodel.insertMany(obj);
			logger.info('El producto se ha añadido correctamente')
			return productoDTO(product[0])
		} catch (err) {
			logger.error(err);
		}
	}

	async getById(id) {

		try {
			const product = await Productmodel.findById(id);
			if (product) {
				return productoDTO(product)
			} else {
				logger.info('El producto no existe')
			}
		} catch (err) {
			logger.error(err);

		}
	}
	async updateProduct(id, update) {

		try {
			let data = await Productmodel.updateOne({ _id: id }, { $set: update });
			if (data.modifiedCount) {
				logger.info('productos actualizado correctamente')
				return data;
			} else {
				logger.info('El productos no ha podido ser actualizado')
			}
		} catch (err) {
			logger.error(err);
		}
	}

	async getAll() {

		try {
			let products = await Productmodel.find();
			if (products.length > 0) {
				return productoDTO(products)
			} else {
				logger.info('La colección esta vacía')
			}
		} catch (err) {
			logger.error(err);
		}
	}

	async deleteById(id) {

		try {
			let data = await Productmodel.deleteOne({ _id: id });
			if (data.deletedCount) {
				logger.info('producto eliminado');
				return data;
			} else {
				logger.info('El producto no existe');
			}
		} catch (err) {
			logger.error(err);
		}

	}
	static getInstance() {
		if (!instance) {
			instance = new ProductsDAO();
			logger.info('Se ha creado una instancia de ProductsDAO');
		}
		logger.info('Se ha utilizado una instancia ya creada de ProductsDAO');
		return instance;
	}
}







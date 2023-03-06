import Productmodel from '../models/product.js';

class ProductsContainer {
	
	async save(obj) {
		let newproduct = new Productmodel({ timestamp: Date.now(), ...obj });
		try {
			await newproduct.save();
			logger.info('El producto se ha añadido correctamente')
		} catch (err) {
			logger.error(err);
		}
	}

	async getById(id) {
		let data = null;
		try {
			data = await Productmodel.findById(id);
			if (data) {
				return data
			} else {
				logger.info('El producto no existe')
			}
		} catch (err) {
			logger.error(err);

		}
	}
	async updateProduct(id, update) {
		let data = null;
		try {
			data = await Productmodel.updateOne({ _id: id }, { $set: update });
			if (data.modifiedCount) {
				logger.info('productos actualizado correctamente')
			} else {
				logger.info('El productos no ha podido ser actualizado')
			}
		} catch (err) {
			logger.error(err);
		}
	}

	async getAll() {
		let data = null;
		try {
			data = await Productmodel.find();
			if (data.length > 0) {
				return data
			} else {
				logger.info('La colección esta vacía')
			}
		} catch (err) {
			logger.error(err);
		}
	}

	async deleteById(id) {
		let data = null;
		try {
			data = await Productmodel.deleteOne({ _id: id });
			if (data.deletedCount) {
				logger.info('producto eliminado');
			} else {
				logger.info('El producto no existe');
			}
		} catch (err) {
			logger.error(err);
		}

	}
}

export default ProductsContainer;



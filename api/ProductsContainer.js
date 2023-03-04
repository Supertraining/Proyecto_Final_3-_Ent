import Productmodel from '../models/product.js';
import mongoose from 'mongoose';
import { connect } from '../utils/mongoConnection.js';

class ProductsContainer {
	constructor(url) {
		this.url = url;
	}

	async save(obj) {
		let newproduct = new Productmodel({ timestamp: Date.now(), ...obj });
		try {
			await newproduct.save();
			return ('El producto se ha añadido correctamente')
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
	}

	async getById(id) {
		let data = null;
		try {
			data = await Productmodel.findById(id);
			if (data) {
				return data
			} else {
				return ('El producto no existe')
			}
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);

		}
	}
	async updateProduct(id, update) {
		let data = null;
		try {
			data = await Productmodel.updateOne({ _id: id }, { $set: update });
			if (data.modifiedCount) {
				return ('productos actualizado correctamente')
			} else {
				return ('El productos no ha podido ser actualizado')
			}
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
	}

	async getAll() {
		let data = null;
		try {
			data = await Productmodel.find();
			if (data.length > 0) {
				return data
			} else {
				return ('La colección esta vacía')
			}
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
	}

	async deleteById(id) {
		let data = null;
		try {
			data = await Productmodel.deleteOne({ _id: id });
			if (data.deletedCount) {
				return 'producto eliminado';
			} else {
				return 'El producto no existe';
			}
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}

	}
}

export default ProductsContainer;



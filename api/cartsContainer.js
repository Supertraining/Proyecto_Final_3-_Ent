import mongoose from 'mongoose';
import Cartmodel from '../models/carts.js';
import Productmodel from '../models/product.js';
import { connect } from '../utils/mongoConnection.js';

class CartContainer {
	constructor(url) {
		this.url = url;
	}

	async createCart(obj) {
		let newCart = new Cartmodel({ timestamp: Date.now(), ...obj });
		try {
			await newCart.save();
			return newCart;
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} 
	}
	async addProduct(cartId, productId) {
		let data = null;
		try {
			let product = await Productmodel.findById(productId);
			data = await Cartmodel.updateOne({ _id: cartId }, { $push: { productos: product } });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} 
		if (data.modifiedCount) {
			return `El producto ${productId} se ha añadido correctamente al carrito ${cartId}`;
		} else {
			return 'El productos no ha podido ser añadido';
		}
	}

	async getByCartId(id) {
		let data = null;
		try {
			data = await Cartmodel.findById(id);
			if (!data) {
				return `El carrito con el ID ${id} no existe`;
			} else {
				return data;
			}
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
	}

	async getAll() {
		let data = null;
		try {
			data = await Cartmodel.find();
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} 
		if (data.length > 0) {
			return data;
		} else {
			return 'La colección esta vacía';
		}
	}

	async deleteCartById(id) {
		let data = null;
		try {
			data = await Cartmodel.deleteOne({ _id: id });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} 
		if (data.deletedCount) {
			return `El carrito ${id} ha sido eliminado`;
		} else {
			return 'El carrito no existe';
		}
	}
	async deleteCartProductById(cartId, productId) {
		let data = null;
		try {
			let product = await Productmodel.findById(productId);
			data = await Cartmodel.updateOne({ _id: cartId }, { $pull: { productos: product } });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} 
		if (data.modifiedCount) {
			return `El producto ${productId} ha sido borrado del carrito ${cartId}`;
		} else {
			return 'El productos no ha podido ser borrado';
		}
	}
}

export default CartContainer;

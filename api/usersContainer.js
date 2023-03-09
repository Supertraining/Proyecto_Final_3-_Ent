import * as model from '../models/user.js';
import bcrypt from 'bcrypt';
import logger from '../utils/logger.js';

function createHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

class userContainer {
	async getUser(username) {
		let data = null;
		try {
			data = await model.usermodel.find({ username: username });
			return data[0];
		} catch (err) {
			logger.error(err);
			return (data = null);
		}
	}
	async authHash(username, password) {
		try {
			let data = await this.getUser(username);
			let auth = await bcrypt.compare(password, data.password);
			return auth;
		} catch (err) {
			logger.error(err);
		}
	}
	async insertUser(data) {
		try {
			const user = { username: data.username, password: createHash(data.password), nombre: data.nombre, direccion: data.direccion, edad: data.edad, telefono: data.telefono, imagen: data.imagen, cartId: data.cartId };
			await model.usermodel.insertMany(user);
			let newUser = data;
			return newUser;
		} catch (err) {
			logger.error(err);
		}
	}
}

export default userContainer;

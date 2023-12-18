import * as model from '../schemas/user.js';
import bcrypt from 'bcrypt';
import logger from '../utils/logger.js';
import userDTO from '../DTOs/userDTO.js';
import { userDataDTO } from '../DTOs/userDTO.js';

let instance = null;

export default class UsersDAO {
	
	async getUser(username) {
		try {
			const data = await model.usermodel.find({ username: username });
			return userDTO(data);
		} catch (err) {
			logger.error(err);
		}
	}
	async getMyUserData(username) {
		try {
			const data = await model.usermodel.findOne({ username: username });
			return userDataDTO(data)
		} catch (err) {
			logger.error(err);
		}
	}
	async authHash(username, password) {
		try {
			const data = await this.getUser(username);
			let auth = bcrypt.compare(password, data.password);
			return auth;
		} catch (err) {
			logger.error(err);
		}
	}
	async insertUser(data) {
		try {
			const newUser = await model.usermodel.insertMany(data);
			return newUser[0];
		} catch (err) {
			logger.error(err);
		}
	}

	static getInstance() {
		if (!instance) {
			instance = new UsersDAO();
			logger.info('Se ha creado una instancia de UsersDAO');
		}
		logger.info('Se ha utilizado una instancia ya creada de usersDAO');
		return instance;
	}
}



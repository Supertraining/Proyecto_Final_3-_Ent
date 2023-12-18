import DAOFactory from "../DAOs/DAOFactory.js";
import logger from "../utils/logger.js";

export default class UsersRepo {
	constructor() {
		this.dao = DAOFactory.getDao()
		this.userDao = this.dao.userDAO
	}

	async getUser(username) {
		try {
			const data = await this.userDao.getUser(username);
			return data;
		} catch (err) {
			logger.error(err);
		}
	}
	async getMyUserData(username) {
		try {
			const data = await this.userDao.getMyUserData(username);
			return data;
		} catch (err) {
			logger.error(err);
		}
	}
	async authHash(username, password) {
		try {
			let auth = await this.userDao.authHash(username, password);
			return auth;
		} catch (err) {
			logger.error(err);
		}
	}
	async insertUser(data) {
		try {
			const newUSer = await this.userDao.insertUser(data);
			return newUSer;
		} catch (err) {
			logger.error(err);
		}
	}
}



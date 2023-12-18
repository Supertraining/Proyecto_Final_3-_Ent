import UsersRepo from "../repo/usersRepo.js";
import logger from "../utils/logger.js";
import bcrypt from 'bcrypt';

function createHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
export default class UsersServices {
    constructor() {
        this.repo = new UsersRepo();
    }

    async getUser(username) {
        try {
            const user = await this.repo.getUser(username);
            return user;
        } catch (error) {
            logger.error(error);
        }
    }
    async getMyUserData(username) {
        try {
            const user = await this.repo.getMyUserData(username);
            return user;
        } catch (error) {
            logger.error(error);
        }
    }

    async authHash(username, password) {
        try {
            const auth = await this.repo.authHash(username, password);
            return auth;
        } catch (error) {
            logger.error(error);
        }
    }

    async insertUser(data) {
        try {
            const password = createHash(data.password)
            const user = { ...data, password: password };
            const newUser = await this.repo.insertUser(user);
            return newUser;
        } catch (error) {
            logger.error(error);
        }
    }
}

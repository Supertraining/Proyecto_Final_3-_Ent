import mongoose from "mongoose";
import logger from './logger.js'

export const connect = async (url) => {
    try {
        await mongoose.connect(`${url}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('Base de datos MongDB Atlas conectada');
    } catch (err) {
        logger.error(err);
    }
}
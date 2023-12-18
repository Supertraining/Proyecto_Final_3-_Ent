import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import CartContainer from '../../DAOs/cartsDAO.js';
import { adminNewUserNotification } from '../../utils/notifications.js';
import logger, { routeLogger } from '../../utils/logger.js';
import UsersServices from '../../services/users.js';

const cartsContainer = new CartContainer();
const usersServices = new UsersServices();

passport.serializeUser(async (user, done) => {
    try {
        let username = await user.username
        done(null, username);
    }
    catch (error) {
        logger.info(error);
    }

});

passport.deserializeUser(async (username, done) => {
    try {
        let usuario = await usersServices.getUser(username);
        done(null, usuario);
    } catch (error) {
        logger.info(error);

    }

});


export const passportRegister = async (req, res, next) => {
    try {
        passport.use(
            'register',
            new LocalStrategy(
                {
                    passReqToCallback: true,
                },
                async (req, username, password, done) => {
                    let usuario = await usersServices.getUser(username);
                    let cart = await cartsContainer.createCart();
                    if (usuario) {
                        return done(null, false);
                    }
                    const { nombre, direccion, edad, telefono } = req.body;

                    const newUser = {
                        username,
                        password,
                        nombre,
                        direccion,
                        edad,
                        telefono,
                        imagen: `http://localhost:8080/imagen/${req.body.username}`, cartId: cart._id.valueOf()
                    }

                    const insertedUser = await usersServices.insertUser(newUser);

                    adminNewUserNotification(req.body);
                    done(null, insertedUser);
                }
            )
        );
    } catch (error) {
        routeLogger(req, 'error', error);
    }
    next();
}
export const passportLogin = async (req, res, next) => {
    try {
        passport.use(
            'login',
            new LocalStrategy(async (username, password, done) => {
                let usuario = await usersServices.getUser(username);

                let auth = await usersServices.authHash(username, password);

                if (!usuario) {
                    return done(null, false);
                }
                if (!auth) {
                    return done(null, false);
                }
                return done(null, usuario);

            })
        );
    } catch (error) {
        routeLogger(req, 'error', error);
    }

    next();
}



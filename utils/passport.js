import userContainer from '../api/usersContainer.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import CartContainer from '../api/cartsContainer.js';
import sendMailNotification from './userMailNotification.js';

const cartsContainer = new CartContainer();

const usersContainer = new userContainer();

function serialDeserial(){
passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
	let usuario = await usersContainer.getUser(username);
	done(null, usuario);
});

}

function passportRegister(req, res, next) {
	passport.use(
		'register',
		new LocalStrategy(
			{
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				let usuario = await usersContainer.getUser(username);
				let cart = await cartsContainer.createCart();
				if (usuario) {
					return done(null, false);
				}
				
				let newUser = await usersContainer.insertUser({ username, password, nombre: req.body.nombre, direccion: req.body.direccion, edad: req.body.edad, imagen: `http://localhost:8080/imagen/${req.body.username}`, cartId: cart._id.valueOf() });
				sendMailNotification(req.body);
				done(null, newUser);
			}
		)
	);
	next();
}
function passportLogin(req, res, next) {
	passport.use(
		'login',
		new LocalStrategy(async (username, password, done) => {
			let usuario = await usersContainer.getUser(username);

			let auth = await usersContainer.authHash(username, password);

			if (!usuario) {
				return done(null, false);
			}
			if (!auth) {
				return done(null, false);
			}

			return done(null, usuario);
		})
	);
	next();
}

export { passportRegister, passportLogin, serialDeserial };

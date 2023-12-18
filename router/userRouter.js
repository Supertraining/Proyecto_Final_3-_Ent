import express from 'express';
import passport from 'passport';
import UsersController from '../controllers/users.js';
import { passportRegister, passportLogin } from './middlewares/auth.js';

const router = express.Router();

export default class UserRouter {
	constructor() {
		this.controllers = new UsersController();
	}

	start() {

		router.get('/register', (req, res) => {
			res.render('register');
		});

		router.post(
			'/register',
			passportRegister,
			this.controllers.savePicturesLocal,
			passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' })
		);

		router.get('/failregister', (req, res) => {
			res.render('register-error', { error: req });
		});

		router.get('/login', (req, res) => {
			if (req.isAuthenticated()) {
				res.redirect('/inicio');
			}
			res.render('login');
		});

		router.post('/login', passportLogin,
			passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/inicio' })
		);

		router.get('/faillogin', this.controllers.failLogin);
		router.get('/inicio', this.controllers.requireAuthentication, this.controllers.getUser);
		router.get('/logout', this.controllers.logout);
		router.get('/', (req, res) => {
			res.redirect('/inicio');

		});

		router.get('/imagen/:username', this.controllers.getUserImage);
		router.get('/miUsuario', this.controllers.getMyUserData);
		router.get('/miCarrito', this.controllers.getMyCart);
		router.post('/miCarrito', this.controllers.newOrderNotification);
		router.get('/productos/:categoria?', this.controllers.getProducts);

		return router;
	}
}






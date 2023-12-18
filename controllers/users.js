import UsersServices from '../services/users.js';
import ProductServices from '../services/products.js';
import CartsServices from '../services/carts.js';
import { adminNewOrderNotification, userOrderNotification } from '../utils/notifications.js';
import { routeLogger } from '../utils/logger.js';

export default class UsersController {
	constructor() {
		this.userServices = new UsersServices();
		this.productServices = new ProductServices();
		this.cartServices = new CartsServices();
	}

	getUser = async (req, res) => {
		try {
			let usuario = await this.userServices.getUser(req.user.username);
			res.render('inicio', {
				userName: usuario.username,
			});
		} catch (error) {
			routeLogger(req, 'error', error);
		}

	}

	getMyUserData = async (req, res) => {
		try {
			let user = await this.userServices.getMyUserData(req.user.username);
			res.render('usuario', { usuario: user, imagen: user.username })
		} catch (error) {
			console.log(error);
		}
	}

	requireAuthentication = async (req, res, next) => {
		try {
			if (req.isAuthenticated()) {
				await next();
			} else {
				await res.redirect('/login');
			}
		} catch (error) {
			routeLogger(req, 'error', error);
		}

	};

	savePicturesLocal = async (req, res, next) => {
		try {
			let image = req.files.imagen;
			image.mv('./public/images/' + `${req.body.username}` + '.jpg');

		} catch (error) {
			console.log(error);
		}
		next();
	};

	getUserImage = async (req, res) => {
		res.render('imagenUsuario', { imagen: `${req.params.username}` });
	};

	getMyCart = async (req, res) => {
		try {
			let user = await this.userServices.getUser(req.user.username);
			let carrito = await this.cartServices.getByCartId(user.cartId);
			let compra = Boolean;
			res.render('carrito', { carrito: carrito, user: user.username, compra: compra });

		} catch (error) {
			console.log(error);
		}
	}

	getProducts = async (req, res) => {
		try {
			if (!req.params.categoria) {
				let products = await this.productServices.getAll();
				res.render('productos', { products: products });
			} else if (req.params.categoria === 'Alcoholicas') {
				let products = await this.productServices.getAll();
				let productsAlcoholicas = products?.filter(product => product.categoria === 'Alcoholica');
				res.render('productos', { products: productsAlcoholicas });
			} else if (req.params.categoria === 'NoAlcoholicas') {
				let products = await this.productServices.getAll();
				let productsNoAlcoholicas = products.filter(product => product.categoria === 'NoAlcoholica');
				res.render('productos', { products: productsNoAlcoholicas });
			}
		} catch (error) {
			console.log(error);
		}
	}

	newOrderNotification = async (req, res) => {
		const user = await this.userServices.getUser(req.user.username);
		const carrito = await this.cartServices.getByCartId(user.cartId);
		const products = carrito.productos;
		let generateOrder = {};
		products.forEach(product => {
			generateOrder[ product.nombre ] ? generateOrder[ product.nombre ]++ : generateOrder[ product.nombre ] = 1;
		})
		const newOrder = JSON.stringify(generateOrder);
		let compra = Boolean;
		adminNewOrderNotification(user, newOrder);
		newOrder ? compra = true : compra = false;

		userOrderNotification(user.telefono)

		res.render('carrito', { carrito: carrito, user: user.username, compra: compra });

	}

	logout = (req, res) => {
		res.render('endSession', { userName: req.user.username });
		setTimeout(() => {
			req.logout((err) => {
				if (err) {
					console.log('Error en cierre de sesión');
				} else {
					console.log('session eliminada con éxito');
				}
			});
		}, 2000);
	}

	failLogin = (req, res) => {
		res.render('login-error');
	}

}

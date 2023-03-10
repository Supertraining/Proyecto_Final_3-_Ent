import userContainer from '../api/usersContainer.js';
import cartContainers from '../api/cartsContainer.js';
import ProductContainer from '../api/ProductsContainer.js';
import { adminNewOrderNotification, userOrderNotification } from '../utils/notifications.js';

const usersContainer = new userContainer();
const cartsContainer = new cartContainers();
const productsContainer = new ProductContainer();


export const requireAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
};

export const savePicturesLocal = async (req, res, next) => {
	try {
		let image = req.files.imagen;
		image.mv('./public/images/' + `${req.body.username}` + '.jpg');

	} catch (error) {
		console.log(error);
	}
	next();
};

export const getUserImage = async (req, res) => {
	res.render('imagenUsuario', { imagen: `${req.params.username}` });
};

export const getUser = async (req, res) => {
	let usuario = await usersContainer.getUser(req.user.username);
	res.render('inicio', {
		userName: usuario.username,
	});
}

export const getMyUserData = async (req, res) => {
	try {
		let user = await usersContainer.getUser(req.user.username);
		res.render('usuario', { usuario: user, imagen: user.username })
	} catch (error) {
		console.log(error);
	}
}

export const getMycart = async (req, res) => {
	try {
		let user = await usersContainer.getUser(req.user.username);
		let carrito = await cartsContainer.getByCartId(user.cartId);
		let compra = Boolean;
		res.render('carrito', { carrito: carrito, user: user.username, compra: compra });

	} catch (error) {
		console.log(error);
	}
}

export const getProducts = async (req, res) => {
	try {
		if (!req.params.tipo) {
			let products = await productsContainer.getAll();
			res.render('productos', { products: products });
		} else if (req.params.tipo === 'Alcoholicas') {
			let products = await productsContainer.getAll();
			let productsAlcoholicas = products.filter(product => product.tipo === 'Alcoholica');
			res.render('productos', { products: productsAlcoholicas });
		} else if (req.params.tipo === 'NoAlcoholicas') {
			let products = await productsContainer.getAll();
			let productsNoAlcoholicas = products.filter(product => product.tipo === 'NoAlcoholica');
			res.render('productos', { products: productsNoAlcoholicas });
		}
	} catch (error) {
		console.log(error);
	}
}

export const newOrderNotification = async (req, res) => {
	const user = await usersContainer.getUser(req.user.username);
	const carrito = await cartsContainer.getByCartId(user.cartId);
	const products = carrito.productos;
	let generateOrder = {};
	products.forEach(product => {
		generateOrder[product.nombre] ? generateOrder[product.nombre]++ : generateOrder[product.nombre] = 1;
	})
	const newOrder = JSON.stringify(generateOrder);
	let compra = Boolean;
	adminNewOrderNotification(user, newOrder);
	newOrder ? compra = true : compra = false;

	userOrderNotification(user.telefono)

	res.render('carrito', { carrito: carrito, user: user.username, compra: compra });

}

export const logout = (req, res) => {
	res.render('endSession', { userName: req.user.username });
	setTimeout(() => {
		req.logout((err) => {
			if (err) {
				console.log('Error en cierre de sesi??n');
			} else {
				console.log('session eliminada con ??xito');
			}
		});
	}, 2000);
}

export const failLogin = (req, res) => {
	res.render('login-error');
}
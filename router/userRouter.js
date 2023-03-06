import express from 'express';
import userContainer from '../api/usersContainer.js';
import passport from 'passport';
import { passportLogin, passportRegister, serialDeserial } from '../utils/passport.js';
import { newOrderNotification, failLogin, getMycart, getMyUserData, getProducts, getUser, getUserImage, logout, requireAuthentication, savePicturesLocal } from '../controllers/usersController.js';

import { routeLogger } from '../utils/logger.js';

const usersContainer = new userContainer();

serialDeserial();

const router = express.Router();

router.get('/register', (req, res) => {
	res.render('register');
});

router.post(
	'/register',
	passportRegister,
	savePicturesLocal,
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

router.get('/faillogin', failLogin);
router.get('/inicio', requireAuthentication, getUser);
router.get('/logout', logout);
router.get('/', (req, res) => {
	res.redirect('/inicio');

});

router.get('/imagen/:username', getUserImage);
router.get('/miUsuario', getMyUserData);
router.get('/miCarrito', getMycart);
router.post('/miCarrito', newOrderNotification);
router.get('/productos/:tipo?', getProducts);


export default router;

import express, { json, urlencoded } from 'express';
import session from 'express-session';
import productsRouter from './router/routerProducts.js';
import cartsRouter from './router/routerCarts.js';
import userRouter from './router/userRouter.js';
import passport from 'passport';
import { connect } from './utils/mongoConnection.js';
import mongoStore from 'connect-mongo';
import fileUpload from 'express-fileupload';

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


connect('mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority');

const app = express();

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
	session({
		store: mongoStore.create({
			mongoUrl: 'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority',
			mongoOptions: advancedOptions,
			collectionName: 'sessions',
			ttl: 600,
		}),
		secret: 'calabaza',
		resave: false,
		saveUninitialized: false,
	})
);


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());
app.use('/public/images/', express.static('./public/images'));
app.use('/public/icons', express.static('./public/icons'));
app.set('view engine', 'ejs');

app.use('/api/productos', productsRouter);
app.use('/api/carritos', cartsRouter);
app.use(userRouter);


const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Server listening at ${PORT}`);
});

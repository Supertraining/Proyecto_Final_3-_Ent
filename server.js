import express, { json, urlencoded } from 'express';
import session from 'express-session';
import productsRouter from './router/routerProducts.js';
import cartsRouter from './router/routerCarts.js';
import userRouter from './router/userRouter.js';
import passport from 'passport';
import { connect } from './utils/mongoConnection.js';
import mongoStore from 'connect-mongo';
import dotenv from "dotenv";
import fileUpload from 'express-fileupload';
import logger, { routeLogger } from './utils/logger.js';

dotenv.config();
connect(process.env.MONGO_URL);


const app = express();

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
	session({
		store: mongoStore.create({
			mongoUrl: process.env.MONGO_URL,
			mongoOptions: advancedOptions,
			collectionName: 'sessions',
			ttl: 600,
		}),
		secret: process.env.SECRET,
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
app.use('/public/js', express.static('./public/js'));
app.set('view engine', 'ejs');

app.use('/api/productos', productsRouter);
app.use('/api/carritos', cartsRouter);
app.use(userRouter);

app.all('/*', async (req, res) => {
	const { url, method } = await req
	routeLogger(req, 'warn')
	res.send(`La ruta ${method} ${url} no esta implementada`)
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	logger.info(`Server on at ${PORT} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
});

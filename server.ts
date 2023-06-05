import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import deserializeUser from './src/middlewares/deserializeUser';
import { badRequestHandler } from './src/middlewares/badRequestHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use(badRequestHandler);

app.get('/', (req, res) => {
	res.send('Hello, programm is working');
});

app.listen(process.env.PORT, () => {
	console.log(`app listening on port ${process.env.PORT}`);

	routes(app);
});

import express from 'express';
import routes from './routes';
import deserializeUser from './src/middlewares/deserializeUser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.get('/', (req, res) => {
	res.send('Hello, programm is working');
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);

	routes(app);
});

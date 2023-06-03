import express from 'express';
import routes from './src/user/routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello, programm is working');
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);

	routes(app);
});

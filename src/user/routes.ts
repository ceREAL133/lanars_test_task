import { Express, Request, Response } from 'express';
import {
	getUsers,
	addUser,
	getUserById,
	updateUser,
	deleteUser,
} from './controller';
import { healthcheck } from '../helpers/healthcheck';

const { isUserByIdExist } = require('../middlewares/isUserByIdExist');
const { isUserByEmailExist } = require('../middlewares/isUserByEmailExist');

export default function routes(app: Express) {
	app.get('/healthcheck', healthcheck);
	app.get('/api/users', getUsers);
	app.post('/api/users', isUserByEmailExist, addUser);
	app.get('/api/users/:id', isUserByIdExist, getUserById);
	app.put('/api/users/:id', isUserByIdExist, updateUser);
	app.delete('/api/users/:id', isUserByIdExist, deleteUser);
}

import { Express } from 'express';
import {
	getUsers,
	addUser,
	getUserById,
	updateUser,
	deleteUser,
} from './src/user/user.controller';
import { healthcheck } from './src/helpers/healthcheck';
import { isUserByIdExist } from './src/middlewares/isUserByIdExist';
import { isUserByEmailExist } from './src/middlewares/isUserByEmailExist';
import {
	createUserSession,
	invalidateUserSession,
} from './src/session/session.controller';
import requiresUser from './src/middlewares/requiresUser';
import { isUserUpdatingHimself } from './src/middlewares/isUserUpdatingHimself';
import {
	addPortfolio,
	getUserPortfolios,
	removePortfolio,
	updatePortfolio,
} from './src/portfolio/portfolio.controller';
import { isPortfolioBelongsToUser } from './src/middlewares/isPortfolioBelonsToUser';

export default function routes(app: Express) {
	app.get('/healthcheck', healthcheck);

	app.post('/api/users', isUserByEmailExist, addUser);
	app.get('/api/users', requiresUser, getUsers);
	app.get('/api/users/:id', isUserByIdExist, requiresUser, getUserById);
	app.put(
		'/api/users/:id',
		isUserByIdExist,
		requiresUser,
		isUserUpdatingHimself,
		updateUser
	);
	app.delete(
		'/api/users/:id',
		isUserByIdExist,
		requiresUser,
		isUserUpdatingHimself,
		deleteUser
	);

	app.post('/api/sessions', createUserSession);
	app.delete('/api/sessions', requiresUser, invalidateUserSession);

	app.get('/api/portfolios', getUserPortfolios);
	app.post('/api/portfolios', requiresUser, addPortfolio);
	app.put(
		'/api/portfolios/:id',
		requiresUser,
		isPortfolioBelongsToUser,
		updatePortfolio
	);
	app.delete(
		'/api/portfolios/:id',
		requiresUser,
		isPortfolioBelongsToUser,
		removePortfolio
	);
}

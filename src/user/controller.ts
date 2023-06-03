import { Request, Response } from 'express';
import { pool } from '../../db';
import {
	addUserQuery,
	deleteUserQuery,
	getUserByIdQuery,
	getUsersQuery,
	updateUserQuery,
} from './queries';

export const getUsers = (req: Request, res: Response) => {
	pool.query(getUsersQuery, (err, data) => {
		if (err) throw err;

		res.status(200).json(data.rows);
	});
};

export const getUserById = (req: Request, res: Response) => {
	const { id } = req.params;

	pool.query(getUserByIdQuery, [id], (err, data) => {
		if (err) throw err;

		res.status(200).json(data.rows);
	});
};

export const addUser = (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	pool.query(addUserQuery, [name, email, password], (err, data) => {
		if (err) throw err;

		res.status(201).send(
			`User with name ${name}, email ${email}, password ${password} has been created`
		);
	});
};

export const deleteUser = (req: Request, res: Response) => {
	const { id } = req.params;

	pool.query(deleteUserQuery, [id], (err, data) => {
		if (err) throw err;

		return res.status(200).send(`User with id ${id} was deleted`);
	});
};

export const updateUser = (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, email } = req.body;

	pool.query(updateUserQuery, [id, name, email], (err, data) => {
		if (err) throw err;
		res.status(200).send('User updated successfully');
	});
};

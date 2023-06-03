import { Request, Response } from 'express';
import { sequelize } from '../../db';
import { User } from './model';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.findAll();

		return res.status(200).send(users);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await User.findOne({ where: { id } });

		return res.status(200).send(user);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const addUser = async (req: Request, res: Response) => {
	try {
		const user = await User.create(req.body);

		return res.status(200).send(user);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await User.destroy({ where: { id } });

		return res.status(200).send(`user with id ${id} was deleted`);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const { name, email, password } = req.body;

	try {
		const user = await User.update(
			{ name, email, password },
			{ where: { id }, returning: true }
		);

		return res.status(200).send(user);
	} catch (error: any) {
		throw new Error(error);
	}
};

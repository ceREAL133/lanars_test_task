import { Request, Response } from 'express';
import { User } from './user.model';
import { Session } from '../session/session.model';

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
		const sessions = await Session.findAll({
			where: { userId: id },
		});

		for (const session of sessions) {
			await session.update({ valid: false });
		}
		await Session.update(
			{ userId: null },
			{
				where: { userId: id },
			}
		);

		await User.destroy({ where: { id } });

		return res.status(200).send(`user with id ${id} was deleted`);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const { name, email } = req.body;

	try {
		const user = await User.update(
			{ name, email },
			{ where: { id }, returning: true }
		);

		return res.status(200).send(user);
	} catch (error: any) {
		throw new Error(error);
	}
};

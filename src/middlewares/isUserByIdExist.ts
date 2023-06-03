import { NextFunction, Request, Response } from 'express';
import { User } from '../user/model';

export const isUserByIdExist = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return res.status(404).send('User with this id not found');
	}

	next();
};

import { NextFunction, Request, Response } from 'express';
import { User } from '../user/model';

export const isUserByEmailExist = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;
	const user = await User.findOne({ where: { email } });

	if (user) {
		return res.status(409).send('User with this email already exist');
	}

	next();
};

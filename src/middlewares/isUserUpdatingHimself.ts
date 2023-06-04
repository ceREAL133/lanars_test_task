import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { get } from 'lodash';

export const isUserUpdatingHimself = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const accessToken = get(req, 'headers.authorization', '').replace(
		/^Bearer\s/,
		''
	);

	const decoded = decode(accessToken);

	if (decoded) {
		//@ts-ignore
		const userWhoPerformsActionId = decoded.id;

		if (
			userWhoPerformsActionId &&
			userWhoPerformsActionId.toString() === id
		) {
			next();
		} else {
			return res
				.status(403)
				.send('You are not allowed to perform this action');
		}
	}
};

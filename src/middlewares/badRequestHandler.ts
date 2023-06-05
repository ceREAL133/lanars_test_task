import { NextFunction, Request, Response } from 'express';

export const badRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.statusCode === 400) {
		res.status(400).json({ error: err.message });
	} else {
		next(err);
	}
};

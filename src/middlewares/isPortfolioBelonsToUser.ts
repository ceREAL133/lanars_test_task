import { NextFunction, Request, Response } from 'express';
import { Portfolio } from '../portfolio/portfolio.model';
import { getUserId } from '../helpers/getUserId';

export const isPortfolioBelongsToUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = getUserId(req);

	const { portfolioid } = req.params;

	if (userId) {
		const foundPortfolio = await Portfolio.findOne({
			where: { id: portfolioid },
		});
		const portfolioToBeUpdated = foundPortfolio?.toJSON();

		if (portfolioToBeUpdated?.userid === userId) {
			next();
		} else {
			return res
				.status(403)
				.send('You are not allowed to perform this action');
		}
	} else {
		res.status(403).send('failed authorize');
	}
};

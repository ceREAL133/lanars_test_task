import { NextFunction, Request, Response } from 'express';
import { getUserId } from '../helpers/getUserId';
import { Image, Portfolio } from '../image/image.model';
import { User } from '../user/user.model';

export const isImageBelongsToUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = getUserId(req);
	const { imageid } = req.params;

	if (userId) {
		const portfolios = await Portfolio.findAll({
			where: { userid: userId },
			attributes: ['id'],
		});

		const portfolioIds = portfolios.map((portfolio: any) => portfolio.id);

		const images = await Image.findAll({
			where: { portfolioid: portfolioIds },
			include: [
				{
					model: Portfolio,
					as: 'portfolio',
					attributes: ['name'],
					include: [
						{
							model: User,
							as: 'portfolioUser',
							attributes: [],
							where: { id: userId },
						},
					],
				},
			],
		});

		const foundImage = images.find(
			(image) => image.id.toString() === imageid
		);

		if (foundImage) {
			next();
		} else {
			return res.status(403).send('No such image belongs to you');
		}
	} else {
		res.status(403).send('failed authorize');
	}
};

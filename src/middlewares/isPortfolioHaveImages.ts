import { NextFunction, Request, Response } from 'express';
import { Image } from '../portfolio/portfolio.model';

export const isPortfolioHaveImages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { portfolioid } = req.params;

	try {
		const imagesInPortfolio = await Image.findAll({
			where: { portfolioid },
		});

		console.log('imagesInPortfolio', imagesInPortfolio);

		if (!imagesInPortfolio.length) {
			next();
		} else {
			res.status(403).send('Delete images from portfolio first');
		}
	} catch (error: any) {
		if (error) {
			return new Error(error);
		}
	}
};

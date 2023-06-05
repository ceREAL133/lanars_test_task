import { Request, Response } from 'express';
import { Portfolio } from './portfolio.model';
import { getUserId } from '../helpers/getUserId';

export const getUserPortfolios = async (req: Request, res: Response) => {
	try {
		const userid = getUserId(req);
		const portfolios = await Portfolio.findAll({ where: { userid } });

		res.status(200).send(portfolios);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const addPortfolio = async (req: Request, res: Response) => {
	const userId = getUserId(req);

	if (userId) {
		try {
			const portfolio = await Portfolio.create({
				...req.body,
				userid: userId,
				createdat: new Date(),
				updatedat: new Date(),
			});

			return res.status(200).send(portfolio);
		} catch (error: any) {
			throw new Error(error);
		}
	} else {
		res.status(403).send('failed authorize');
	}
};

export const updatePortfolio = async (req: Request, res: Response) => {
	const { portfolioid } = req.params;
	const { name, description } = req.body;

	try {
		const updatedPortfolio = await Portfolio.update(
			{
				name,
				description,
				updatedat: new Date(),
			},
			{ where: { id: portfolioid }, returning: true }
		);

		return res.status(200).send(updatedPortfolio);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const removePortfolio = async (req: Request, res: Response) => {
	const { portfolioid } = req.params;

	try {
		await Portfolio.destroy({ where: { id: portfolioid } });

		return res
			.status(200)
			.send(`Portfolio with id ${portfolioid} was deleted`);
	} catch (error: any) {
		throw new Error(error);
	}
};

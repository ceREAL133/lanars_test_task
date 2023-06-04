import { Request, Response } from 'express';
import { Portfolio } from './portfolio.model';
import { get } from 'lodash';
import { getUser } from '../helpers/getUser';

export const getUserPortfolios = async (req: Request, res: Response) => {
	try {
		const portfolios = await Portfolio.findAll();

		res.status(200).send(portfolios);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const addPortfolio = async (req: Request, res: Response) => {
	const userId = getUser(req);

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
	const { id: portfolioId } = req.params;
	const { name, description } = req.body;

	try {
		const updatedPortfolio = await Portfolio.update(
			{
				name,
				description,
				updatedat: new Date(),
			},
			{ where: { id: portfolioId }, returning: true }
		);

		return res.status(200).send(updatedPortfolio);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const removePortfolio = async (req: Request, res: Response) => {
	const { id: portfolioId } = req.params;

	console.log(portfolioId);

	try {
		await Portfolio.destroy({ where: { id: portfolioId } });

		return res
			.status(200)
			.send(`Portfolio with id ${portfolioId} was deleted`);
	} catch (error: any) {
		throw new Error(error);
	}
};

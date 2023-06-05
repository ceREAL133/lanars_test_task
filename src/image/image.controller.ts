import { Request, Response } from 'express';
import { Image } from './image.model';
import { Portfolio } from '../portfolio/portfolio.model';
import { getUserId } from '../helpers/getUserId';
import { User } from '../user/user.model';
import { deleteFile } from '../helpers/deleteFIle';

export const uploadImageToPortfolio = async (req: Request, res: Response) => {
	try {
		const imageurl = req.file?.path;
		const { portfolioid } = req.params;

		const image = await Image.create({
			...req.body,
			portfolioid,
			imageurl,
			createdat: new Date(),
			updatedat: new Date(),
		});

		res.status(201).json({
			success: true,
			message: 'Image uploaded successfully',
			data: image,
		});
	} catch (error: any) {
		console.error('Error uploading image:', error);
		res.status(500).json({
			success: false,
			message: 'Failed to upload image',
			error: error.message,
		});
	}
};

export const getImagesByUser = async (req: Request, res: Response) => {
	try {
		const userId = getUserId(req);

		console.log(userId);

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

		return res.json(images);
	} catch (error) {
		console.error('Error fetching images by user:', error);
		throw error;
	}
};

export const getImageInformationWithPortfolio = async (
	req: Request,
	res: Response
) => {
	try {
		const images = await Image.findAll({
			include: [
				{ model: Portfolio, as: 'portfolio', attributes: ['name'] },
			],
			order: [['createdat', 'DESC']],
		});

		return res.send(images);
	} catch (error) {
		console.error('Error fetching image information:', error);
		throw error;
	}
};

export const deleteUserImage = async (req: Request, res: Response) => {
	const { imageid } = req.params;

	const imageToBeDeleted = await Image.findOne({ where: { id: imageid } });
	if (imageToBeDeleted) {
		try {
			const filePath = imageToBeDeleted.imageurl;

			await Image.destroy({ where: { id: imageid } });
			deleteFile(filePath);

			return res.status(200).send(`Image with id ${imageid} was deleted`);
		} catch (error: any) {
			throw new Error(error);
		}
	} else {
		res.status(404).send('No such image');
	}
};

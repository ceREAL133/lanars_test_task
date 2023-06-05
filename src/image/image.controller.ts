import { Request, Response } from 'express';
import { Image, ImageAttributes } from './image.model';
import { Portfolio } from '../portfolio/portfolio.model';

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

export const getAllImages = async (req: Request, res: Response) => {
	try {
		const images = await Image.findAll();

		res.status(200).send(images);
	} catch (error: any) {
		throw new Error(error);
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

import { sequelize } from '../../db';

export const healthcheck = async (req: any, res: any) => {
	try {
		await sequelize.authenticate();
		res.send('ok');
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

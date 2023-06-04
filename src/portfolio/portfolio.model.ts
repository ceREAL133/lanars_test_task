import { Model, Optional, STRING, INTEGER, DATE } from 'sequelize';
import { sequelize } from '../../db';
import { User } from '../user/user.model';
import { Image } from '../image/image.model';

export interface PortfolioAttributes {
	id: number;
	name: string;
	description: string;
	userid: number;
	createdat: Date;
	updatedat: Date;
}

interface PortfolioCreationAttributes
	extends Optional<PortfolioAttributes, 'id'> {}

export const Portfolio = sequelize.define<
	Model<PortfolioAttributes, PortfolioCreationAttributes>
>(
	'Portfolio',
	{
		id: {
			type: INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: STRING,
			allowNull: false,
		},
		description: {
			type: STRING,
			allowNull: false,
		},
		userid: {
			type: INTEGER,
			allowNull: false,
		},
		createdat: {
			type: DATE,
			allowNull: false,
		},
		updatedat: {
			type: DATE,
			allowNull: false,
		},
	},
	{
		tableName: 'portfolios',
		timestamps: false,
	}
);

Portfolio.belongsTo(User, { foreignKey: 'userid', as: 'portfolioUser' });
Portfolio.hasMany(Image, { foreignKey: 'portfolioId', as: 'imagesUser' });

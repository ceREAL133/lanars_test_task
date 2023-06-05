import { Model, STRING, INTEGER, DATE, ARRAY, Optional } from 'sequelize';
import { sequelize } from '../../db';
import { Portfolio } from '../portfolio/portfolio.model';

export interface ImageAttributes {
	id: number;
	name: string;
	description: string;
	comments: string[];
	portfolioid: number;
	imageurl: string;
	createdat: Date;
	updatedat: Date;
}

export interface ImageInstance
	extends Model<Optional<ImageAttributes, 'id'>>,
		ImageAttributes {}

export const Image = sequelize.define<ImageInstance, ImageAttributes>(
	'Image',
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
		comments: {
			type: ARRAY(STRING),
			defaultValue: [],
		},
		portfolioid: {
			type: INTEGER,
			allowNull: false,
		},
		imageurl: {
			type: STRING,
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
		tableName: 'images',
		timestamps: false,
	}
);

Image.belongsTo(Portfolio, { foreignKey: 'portfolioid', as: 'portfolio' });
export { Portfolio };

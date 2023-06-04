import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../db';

export interface ImageAttributes {
	id: number;
	name: string;
	description: string;
	comments: string[];
	imageUrl: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ImageInstance
	extends Model<ImageAttributes>,
		ImageAttributes {}

export const Image = sequelize.define<ImageInstance>(
	'Image',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		comments: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			defaultValue: [],
		},
		imageUrl: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		tableName: 'images',
	}
);

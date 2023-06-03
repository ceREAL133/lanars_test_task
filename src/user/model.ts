import { STRING } from 'sequelize';
import { sequelize } from '../../db';

export const User = sequelize.define(
	'users',
	{
		name: STRING,
		email: STRING,
		password: STRING,
	},
	{
		timestamps: false,
	}
);

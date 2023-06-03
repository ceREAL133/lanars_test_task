import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.DATABASE as string;
const password = process.env.PASSWORD as string;

export const sequelize = new Sequelize(db, 'postgres', password, {
	host: 'localhost',
	dialect: 'postgres',
});

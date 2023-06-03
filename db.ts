// import { Pool } from 'pg';
import { Sequelize } from 'sequelize';

// export const pool = new Pool({
// 	user: 'postgres',
// 	host: 'localhost',
// 	database: 'lanars',
// 	password: 'root',
// 	port: 5432,
// });

export const sequelize = new Sequelize('lanars', 'postgres', 'root', {
	host: 'localhost',
	dialect: 'postgres',
});

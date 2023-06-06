require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: 'localhost',
		dialect: 'postgres',
	},
};

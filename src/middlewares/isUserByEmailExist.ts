import { NextFunction, Request, Response } from 'express';
import { pool } from '../../db';
import { checkEmailExistsQuery } from '../user/queries';
import { PoolClient, QueryResult } from 'pg';

export const isUserByEmailExist = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;

	pool.query(
		checkEmailExistsQuery,
		[email],
		(err, data: QueryResult<PoolClient>) => {
			const noUserFound = !data.rows.length;

			if (noUserFound) {
				next();
			} else return res.send('User already exists in db');
		}
	);
};

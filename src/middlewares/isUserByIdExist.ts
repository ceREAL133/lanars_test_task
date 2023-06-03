import { PoolClient, QueryResult } from 'pg';
import { getUserByIdQuery } from '../user/queries';
import { NextFunction, Request, Response } from 'express';
import { pool } from '../../db';

export const isUserByIdExist = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	pool.query(
		getUserByIdQuery,
		[id],
		(err: Error, data: QueryResult<PoolClient>) => {
			const noUserFound = !data.rows.length;

			if (noUserFound) {
				return res.send('User does not exists in db');
			} else next();
		}
	);
};

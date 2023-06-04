import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';

import { reIssueAccessToken } from '../session/session.controller';
import { decode } from '../utils/jwt.utils';

export const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = get(req, 'headers.authorization', '').replace(
		/^Bearer\s/,
		''
	);

	const refreshToken = get(req, 'headers.x-refresh') as string;

	if (!accessToken) return next();

	const { decoded, expired } = decode(accessToken);

	if (decoded) {
		// @ts-ignore
		req.user = decoded;

		return next();
	}

	if (expired && refreshToken) {
		const newAccessToken = await reIssueAccessToken({ refreshToken });

		if (newAccessToken) {
			res.setHeader('x-access-token', newAccessToken);
			const { decoded } = decode(newAccessToken);

			// @ts-ignore
			req.user = decoded;
		}

		return next();
	}

	return next();
};

export default deserializeUser;

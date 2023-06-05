import { Request } from 'express';
import { decode } from 'jsonwebtoken';
import { get } from 'lodash';

export const getUserId = (req: Request) => {
	const accessToken = get(req, 'headers.authorization', '').replace(
		/^Bearer\s/,
		''
	);
	const user = decode(accessToken);

	//@ts-ignore
	const userId = user?.id;
	return userId;
};

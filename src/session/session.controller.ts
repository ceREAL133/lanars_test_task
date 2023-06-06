import { Request, Response } from 'express';
import { validatePassword } from '../services/validatePassword.service';
import { Session, SessionAttributes } from './session.model';
import { User, UserAttributes } from '../user/user.model';
import { decode, sign } from '../utils/jwt.utils';
import { get } from 'lodash';

export const createUserSession = async (req: Request, res: Response) => {
	const user = await validatePassword(req.body);

	if (!user) {
		return res.status(401).send('Invalid username or password');
	}

	const session = await createSession(user.id, req.get('user-agent') || '');

	const accessToken = createAccessToken({
		user,
		session,
	});

	const refreshToken = sign(session, {
		expiresIn: '1y', // 1 year
	});

	return res.send({ accessToken, refreshToken });
};

export const invalidateUserSession = async (req: Request, res: Response) => {
	const sessionId = get(req, 'user.session');

	await Session.update({ valid: false }, { where: { id: sessionId } });

	return res.status(200).json('Logout successful');
};

export async function createSession(userId: number, userAgent: string) {
	const session = await Session.create({
		userId,
		useragent: userAgent,
		valid: true,
		createdat: new Date(),
		updatedat: new Date(),
	});

	return session.toJSON();
}

export function createAccessToken({
	user,
	session,
}: {
	user: Omit<UserAttributes, 'password'>;
	session: SessionAttributes;
}) {
	const accessToken = sign(
		{ ...user, session: session.id },
		{ expiresIn: '15m' } // 15 minutes
	);

	return accessToken;
}
export async function findSessions(query: any): Promise<SessionAttributes[]> {
	try {
		const sessions = await Session.findAll({
			where: query,
		});

		const plainSessions = sessions.map((session) =>
			session.get({ plain: true })
		);

		return plainSessions;
	} catch (error) {
		console.error('Error finding sessions:', error);
		throw error;
	}
}

export async function reIssueAccessToken({
	refreshToken,
}: {
	refreshToken: string;
}) {
	const { decoded } = decode(refreshToken);

	if (!decoded || !get(decoded, 'id')) return false;

	const session = await Session.findOne({
		where: { id: get(decoded, 'id') },
	});

	if (!session || !session?.toJSON().valid) return false;

	const userId = session.toJSON().userId as number;

	const user = await User.findOne({ where: { id: userId } });

	if (!user) return false;
	const accessToken = createAccessToken({
		user,
		session: session.get() as SessionAttributes,
	});

	return accessToken;
}

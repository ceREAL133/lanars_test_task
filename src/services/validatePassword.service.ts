import { User, UserAttributes } from '../user/user.model';
import { omit } from 'lodash';

export async function validatePassword({
	email,
	password,
}: {
	email: UserAttributes['email'];
	password: string;
}) {
	const user = await User.findOne({ where: { email } });

	if (!user) {
		return false;
	}

	const isValid = await user.comparePassword(password);

	if (!isValid) {
		return false;
	}
	return omit(user.toJSON(), 'password');
}

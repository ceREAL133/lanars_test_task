import { Model, STRING, ModelAttributes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../../db';

export interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {
	comparePassword(password: string): Promise<boolean>;
}
const userAttributes: ModelAttributes<
	UserInstance,
	Omit<UserAttributes, 'id'>
> = {
	name: STRING,
	email: STRING,
	password: STRING,
};

export const User = sequelize.define<UserInstance, Omit<UserAttributes, 'id'>>(
	'users',
	userAttributes,
	{
		timestamps: false,
	}
);

User.beforeCreate(async (user) => {
	if (user.changed('password')) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
	}
});

User.prototype.comparePassword = function (password: string): Promise<boolean> {
	return bcrypt.compare(password, this.password).catch((e: any) => false);
};

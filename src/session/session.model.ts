import { Model, Optional, INTEGER, BOOLEAN, STRING, DATE } from 'sequelize';
import { sequelize } from '../../db';
import { User } from '../user/user.model';

export interface SessionAttributes {
	id: number;
	userId: number | null;
	valid: boolean;
	useragent: string;
	createdat: Date;
	updatedat: Date;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, 'id'> {}

export const Session = sequelize.define<
	Model<SessionAttributes, SessionCreationAttributes>
>(
	'Session',
	{
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: INTEGER,
			allowNull: true,
			references: {
				model: User,
				key: 'id',
			},
		},
		valid: {
			type: BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		useragent: {
			type: STRING,
		},
		createdat: {
			type: DATE,
			allowNull: false,
		},
		updatedat: {
			type: DATE,
			allowNull: false,
		},
	},
	{
		tableName: 'sessions',
		timestamps: false,
	}
);

Session.belongsTo(User, { foreignKey: 'userId', as: 'sessionUser' });

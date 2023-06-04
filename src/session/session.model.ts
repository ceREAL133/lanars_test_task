import { Model, DataTypes, Optional } from 'sequelize';
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
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		valid: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		useragent: {
			type: DataTypes.STRING,
		},
		createdat: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedat: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		tableName: 'sessions',
		timestamps: false,
	}
);

Session.belongsTo(User, { foreignKey: 'userId', as: 'sessionUser' });

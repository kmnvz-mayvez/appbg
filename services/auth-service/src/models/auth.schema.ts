import { sequelize } from '@auth/database';
import { IAuthDocument } from '@kmnvz-mayvez/myapp-share';
import { compare, hash } from 'bcryptjs';
import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';

const SALT_ROUND = 10;

type AuthUserCreationAttributes = Optional<IAuthDocument, 'id' | 'createdAt' | 'passwordResetToken' | 'passwordResetExpires'>;

const AuthModel: ModelDefined<IAuthDocument, AuthUserCreationAttributes> = sequelize.define('auths', {
  profilePublicId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plateNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hourStay: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now
  },
  passwordResetToken: { type: DataTypes.STRING, allowNull: true },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['username']
    }
  ]
});

AuthModel.addHook('beforeCreate', async (auth: Model) => {
  const hashedPassword: string = await hash(auth.dataValues.password as string, SALT_ROUND);
  auth.dataValues.password = hashedPassword;
});

(AuthModel.prototype as any).comparePassword = async function (password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
};

(AuthModel.prototype as any).hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

AuthModel.sync({});
export { AuthModel };

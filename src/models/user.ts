
import { Model, Sequelize, DataTypes, Optional } from 'sequelize';
import { hashPassword, comparePasswords } from '../utils/password';

export interface UserRequestAttributes {
    name: string,
    email: string,
    password: string,
};

interface UserAttributes extends UserRequestAttributes {
  id: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public comparePassword(password: string): Promise<boolean> {
      return comparePasswords(password, this.password);
    }
     public static associate(models: any) { }
};

export const initialize = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    hooks: {
      beforeCreate: async (user, options) => {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
      }
    }
  });
  return User;
};

export default initialize;
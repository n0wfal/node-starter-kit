'use strict';

import { Model, Sequelize, DataTypes, Optional } from "sequelize";

export interface UserSocialMediaProfileAttributes {
  id: number,
  google_id: string,
  user_id: number
}

interface UserSocialMediaProfileCreationAttributes extends Optional<UserSocialMediaProfileAttributes, 'id'> { };

export class UserSocialMediaProfile extends Model<UserSocialMediaProfileAttributes, UserSocialMediaProfileCreationAttributes>
implements UserSocialMediaProfileAttributes
{
  public id!: number;
  public google_id!: string;
  public user_id!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static associate(models: any) {
    UserSocialMediaProfile.belongsTo(models.User);
  }
};



export const initialize = (sequelize: Sequelize) => {
  UserSocialMediaProfile.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    google_id: DataTypes.STRING,
  }, {
      sequelize,
      modelName: 'UserSocialMediaProfiles',
      underscored: true
  });
  return UserSocialMediaProfile;
};

export default initialize;
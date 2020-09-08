import { Sequelize, DataTypes } from 'sequelize';
import User from './user';
const modelFiles = [User];

const env = process.env.NODE_ENV || 'development';
const CONFIG_OBJ = require('../config/config.json');

const config = CONFIG_OBJ[env]
const db: any = {};

let sequelize: Sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);

Promise.all(modelFiles.map(modelFile => {
  const model = modelFile(sequelize);
  db[model.name] = model;
}));

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// module.exports = db;
export default db;

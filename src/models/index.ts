import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const CONFIG_OBJ = require('../config/config.json');

const config = CONFIG_OBJ[env]
const db: {
  [key: string]: any
} = {};

let sequelize: Sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.ts");
  })
  .forEach(function(file) {
    const modelInstance = require(path.join(__dirname, file));
    const model = modelInstance.initialize(sequelize)
    db[model.name] = model;
  });
  
Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
export default db;

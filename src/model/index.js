'use strict'
require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const employeeModel = require('./Employee.js');
const locationModel = require('./Location.js');

// sqliteDatbase = sqlite:memory
// for folks the need permissions: `postgresql://username:pass@localhost:5432/db-name

let DATABASE_URL = 'sqlite:memory'|| process.env.DATABASE_URL

const sequelizeInstance = new Sequelize(DATABASE_URL, DataTypes);
const employeeTable = employeeModel(sequelizeInstance, DataTypes);
const locationTable = locationModel(sequelizeInstance, DataTypes);
// locationTable.hasMany(employeeTable, {foreignKey: 'title', sourceKey: 'id'});
// employeeTable.belongsTo(locationTable, {foreignKey: 'title'}, {targetKey: 'id'});

module.exports = {
  db: sequelizeInstance,
  employee: employeeTable,
  location: locationTable,
};

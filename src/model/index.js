'use strict'
require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const employeeModel = require('./Employee.js');
const locationModel = require('./Location.js');
// sqliteDatbase = sqlite:memory
// postgresDatabase = 'postgresql://localhost:5432/talk';
// for folks the need permissions: `postgresql://username:pass@localhost:5432/db-name
let DATABASE_URL = process.env.DATABASE_URL
const sequelizeInstance = new Sequelize(DATABASE_URL);
const employeeTable = employeeModel(sequelizeInstance, DataTypes);
const locationTable = locationModel(sequelizeInstance, DataTypes);
locationTable.hasMany(employeeTable, {foreignKey: 'title', sourceKey: 'id'})
employeeTable.belongsTo(locationTable, {foreignKey: 'title', targetKey: 'id'})

module.exports = {
  db: sequelizeInstance,
  employees: employeeTable,
  locations: locationTable,
};

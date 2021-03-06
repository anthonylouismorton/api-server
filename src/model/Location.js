'use strict'

const location = (sequelizeInstance, DataTypes) => sequelizeInstance.define(
  'location', {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manager: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
)

module.exports = location;
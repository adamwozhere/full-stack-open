const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Session = sequelize.define(
  'session',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

module.exports = Session;

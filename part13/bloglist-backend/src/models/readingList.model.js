const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const ReadingList = sequelize.define(
  'readingList',
  {
    // force the join/connection table to have a primary key like standard tables,
    // (otherwise it will infer a composite key)
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

module.exports = ReadingList;

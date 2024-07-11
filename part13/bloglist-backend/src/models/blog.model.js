const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Blog = sequelize.define(
  'blog',
  {
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1991],
          msg: 'Must be at least 1991',
        },
        max: {
          args: [new Date().getFullYear()],
          msg: 'Must not be greater than this year',
        },
      },
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

module.exports = Blog;

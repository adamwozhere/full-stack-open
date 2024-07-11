const { Blog } = require('../models');
const { sequelize } = require('../utils/db');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      ],
      group: 'author',
      order: [
        ['likes', 'DESC'],
        ['articles', 'DESC'],
      ],
    });

    return res.json(blogs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

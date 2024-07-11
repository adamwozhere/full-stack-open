const router = require('express').Router();
const tokenExtractor = require('../middleware/tokenExtractor');

const { blogFinder } = require('../middleware/blogFinder');
const userAuthenticator = require('../middleware/userAuthenticator');
const { Blog, User } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  let where = {};

  if (req.query.search) {
    const searchTerm = `%${req.query.search}%`;

    // or define as a const where and access by array
    // e.g. where[Op.or] = [{ title: { [Op.iLike]: searchTerm } }, { author: { [Op.iLike]: searchTerm } }]
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: searchTerm,
          },
        },
        {
          author: {
            [Op.iLike]: searchTerm,
          },
        },
      ],
    };
  }

  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name'],
      },
      where,
      order: [['likes', 'DESC']],
    });
    return res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', tokenExtractor, userAuthenticator, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    return res.json(blog);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:id',
  tokenExtractor,
  blogFinder,
  userAuthenticator,
  async (req, res, next) => {
    if (!(req.decodedToken.id === req.blog?.userId)) {
      return res.sendStatus(401);
    }

    try {
      if (req.blog) {
        req.blog.likes = req.body.likes;
        await req.blog.save();
        return res.json(req.blog);
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
  if (!(req.decodedToken.id === req.blog?.userId)) {
    return res.sendStatus(401);
  }

  try {
    if (req.blog) {
      await req.blog.destroy();
    }
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

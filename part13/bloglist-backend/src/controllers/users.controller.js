const router = require('express').Router();
const tokenExtractor = require('../middleware/tokenExtractor');
const userAuthenticator = require('../middleware/userAuthenticator');
const { User, Blog } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
    });
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { read } = req.query;

  const where = {};

  try {
    if (read) {
      if (!(read === 'true' || read === 'false')) {
        throw Error('Invalid param for `read`:', read);
      }
      where.read = read === 'true';
    }

    const user = await User.findByPk(req.params.id, {
      attributes: ['name', 'username'],
      include: {
        model: Blog,
        as: 'readings',
        through: { as: 'readingLists', attributes: ['id', 'read'], where },
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      },
    });
    return res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:username',
  tokenExtractor,
  userAuthenticator,
  async (req, res, next) => {
    if (!(req.decodedToken.username === req.params.username)) {
      return res.sendStatus(401);
    }

    try {
      const user = await User.findOne({
        where: { username: req.params.username },
      });
      user.username = req.body.username;
      await user.save();
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

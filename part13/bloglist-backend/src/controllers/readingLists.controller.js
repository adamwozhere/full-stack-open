const tokenExtractor = require('../middleware/tokenExtractor');
const userAuthenticator = require('../middleware/userAuthenticator');
const { ReadingList } = require('../models');

const router = require('express').Router();

router.post('/', async (req, res, next) => {
  const { userId, blogId } = req.body;
  try {
    const newReading = await ReadingList.create({ userId, blogId });
    return res.json(newReading);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:id',
  tokenExtractor,
  userAuthenticator,
  async (req, res, next) => {
    const { id } = req.decodedToken;

    try {
      const readingList = await ReadingList.findByPk(req.params.id);

      if (!(id === readingList.userId)) {
        return res.sendStatus(401);
      }

      readingList.read = req.body.read;
      await readingList.save();
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

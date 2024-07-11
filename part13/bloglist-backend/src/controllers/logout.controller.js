const { Session } = require('../models');

const router = require('express').Router();

router.delete('/', async (req, res, next) => {
  const auth = req.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.substring(7);

    try {
      await Session.destroy({
        where: {
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  return res.sendStatus(201);
});

module.exports = router;
